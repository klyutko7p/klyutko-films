<template>
  <ClientOnly>
    <div class="flex justify-center">
      <TheSidebar />
      <div class="container mx-auto text-white px-20 py-10">
        <slot></slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts"></script>

<style scoped></style>  
