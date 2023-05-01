<template>
  <ClientOnly>
    <TheNavbar />
    <div class="container mx-auto text-white">
      <slot></slot>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts"></script>

<style scoped></style>  
