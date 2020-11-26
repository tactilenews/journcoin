<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <div class="container mx-auto">
        <slot name="default"></slot>
      </div>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
