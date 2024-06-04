<script setup lang="tsx">
import { darkTheme, zhCN } from 'naive-ui'
import { isDark } from './composables/dark'
import Layout from './Layout.vue'
</script>

<template>
  <Suspense>
    <NConfigProvider :locale="zhCN" :theme="isDark ? darkTheme : null">
      <NMessageProvider>
        <NDialogProvider>
          <NModalProvider>
            <NNotificationProvider>
              <NLoadingBarProvider>
                <Layout />
              </NLoadingBarProvider>
            </NNotificationProvider>
          </NModalProvider>
        </NDialogProvider>
      </NMessageProvider>
    </NConfigProvider>
  </Suspense>
</template>
