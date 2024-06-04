<script setup lang="tsx">
import { NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider, darkTheme, zhCN } from 'naive-ui'
import { isDark } from './composables/dark'
</script>

<template>
  <Suspense>
    <NConfigProvider :locale="zhCN" :theme="isDark ? darkTheme : null">
      <NMessageProvider>
        <NDialogProvider>
          <NNotificationProvider>
            <NLoadingBarProvider>
              Hello world!
            </NLoadingBarProvider>
          </NNotificationProvider>
        </NDialogProvider>
      </NMessageProvider>
    </NConfigProvider>
  </Suspense>
</template>
