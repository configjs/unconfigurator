<script setup lang="tsx">
import { darkTheme, zhCN } from 'naive-ui'
import { isDark } from './composables/dark'
import LayoutV2 from './LayoutV2.vue'
</script>

<template>
  <Suspense>
    <NConfigProvider :theme="isDark ? darkTheme : null" :locale="zhCN">
      <LayoutV2 />
    </NConfigProvider>
  </Suspense>
</template>
