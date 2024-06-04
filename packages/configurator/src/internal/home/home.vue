<script setup lang="tsx">
/// <reference types="../../../../../fixtures/base/.configure/frontend/auto-imports" />
/// <reference types="../../../../../fixtures/base/.configure/frontend/components" />

function switchDark() {
  toggleDark()
}
</script>

<template>
  <div>
    <NButton @click="switchDark()">
      切换颜色模式
    </NButton>
  </div>
</template>
