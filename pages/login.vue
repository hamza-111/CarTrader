<script setup>
const supabase = useSupabaseClient()
const login = () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="mt-10">
    <h1 class="font-bold mb-7 text-5xl">Login Page</h1>
    <button @click="login" class="bg-red-500 font-bold text-white rounded p-3">Login with Google</button>
  </div>
</template>
  