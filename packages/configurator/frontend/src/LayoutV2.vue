<script setup lang="tsx">
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
</script>

<template>
  <NLayout>
    <NLayoutHeader>Header</NLayoutHeader>
    <NLayout has-sider>
      <NLayoutSider>
        侧边栏
      </NLayoutSider>
      <NLayoutContent>
        内容
      </NLayoutContent>
    </NLayout>
    <NLayoutFooter>Footer</NLayoutFooter>
  </NLayout>
</template>
