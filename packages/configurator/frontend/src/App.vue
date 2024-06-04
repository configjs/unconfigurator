<script setup lang="tsx">
import { NConfigProvider, darkTheme, zhCN } from 'naive-ui'
import { isDark } from './composables/dark'
</script>

<template>
  <Suspense>
    <NConfigProvider :theme="isDark ? darkTheme : null" :locale="zhCN">
      Hello world!
    </NConfigProvider>
  </Suspense>
</template>
