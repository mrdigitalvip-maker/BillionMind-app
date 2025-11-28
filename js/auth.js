import { supabase } from "./supabaseClient.js";

// REGISTRO
export async function registerUser(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return { error };

  // cria o perfil automaticamente
  await supabase.from('users_profile').insert({
    id: data.user.id,
    name: name,
    plan: "free",
    xp: 0,
    energy: 0,
    elite_level: "Inicial"
  });

  return { data };
}

// LOGIN
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
}

// VERIFICAR SESSÃO
export async function checkSession() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

// LOGOUT
export async function logoutUser() {
  await supabase.auth.signOut();
}
