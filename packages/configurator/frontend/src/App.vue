<script setup lang="tsx">
import { darkTheme, zhCN } from 'naive-ui'
import { isDark } from './composables/dark'
import Layout from './Layout.vue'
</script>

<template>
  <Suspense>
    <NConfigProvider :theme="isDark ? darkTheme : null" :locale="zhCN">
      <Layout />
    </NConfigProvider>
  </Suspense>
</template>
