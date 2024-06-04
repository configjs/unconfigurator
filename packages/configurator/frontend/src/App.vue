<script setup lang="tsx">
import { NConfigProvider } from 'naive-ui'
</script>

<template>
  <Suspense>
    <NConfigProvider>
      Hello world!
    </NConfigProvider>
  </Suspense>
</template>
