<script setup lang="tsx">
import { darkTheme, zhCN } from 'naive-ui'
import { isDark } from './composables/dark'
</script>

<template>
  <Suspense>
    <NConfigProvider :locale="zhCN" :theme="isDark ? darkTheme : null">
      <NMessageProvider>
        <NDialogProvider>
          <NModalProvider>
            <NNotificationProvider>
              <NLoadingBarProvider>
                Hello world!
              </NLoadingBarProvider>
            </NNotificationProvider>
          </NModalProvider>
        </NDialogProvider>
      </NMessageProvider>
    </NConfigProvider>
  </Suspense>
</template>
