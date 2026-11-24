import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

function mapSupabaseUser(sbUser) {
  if (!sbUser) return null;
  const role =
    sbUser.user_metadata?.role ||
    sbUser.app_metadata?.role ||
    "admin";

  return {
    id: sbUser.id,
    email: sbUser.email,
    role,
    user_metadata: sbUser.user_metadata || {},
    app_metadata: sbUser.app_metadata || {},
  };
}

const auth = {
  isConfigured: () => isSupabaseConfigured,

  loginViaEmailPassword: async (email, password) => {
    if (!supabase) {
      throw new Error(
        "Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY."
      );
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      throw new Error(error.message || "Email ou senha inválidos");
    }
    return {
      user: mapSupabaseUser(data.user),
      session: data.session,
    };
  },

  me: async () => {
    if (!supabase) return null;
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return mapSupabaseUser(data.user);
  },

  isAuthenticated: async () => {
    if (!supabase) return false;
    const { data, error } = await supabase.auth.getSession();
    if (error) return false;
    return Boolean(data?.session?.user);
  },

  logout: async (redirectTo) => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  },
};

const fallbackEntities = new Proxy(
  {},
  {
    get: () => ({
      filter: async () => [],
      get: async () => null,
      create: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
      count: async () => 0,
    }),
  }
);

export const db = {
  auth,
  entities: fallbackEntities,
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: "" }),
    },
  },
};

export const base44 = db;
export default db;
