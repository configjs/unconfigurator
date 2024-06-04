<script setup lang="tsx">
const treeData = ref([
  {
    title: 'package.json',
  },
  {
    title: 'package.json',
  },
  {
    title: 'package.jsonssssssssssdjdjdjdjdjdj',
  },
])
</script>

<template>
  <NSplit
    class="unconfigurator-integration-internal-package-sidebar"
    direction="vertical"
  >
    <template #1>
      <USidebarTitle>INFO</USidebarTitle>
      Hello world
    </template>
    <template #2>
      <!-- eslint-disable -->
      <USidebarTitle>FILES</USidebarTitle>
      <NList size="small" hoverable>
        <NListItem
          class="px3! py2!"
          v-for="(item, index) in treeData"
          :key="index"
        >
          <div class="flex items-center justify-between gap1">
            <div class="flex items-center gap1 truncate">
              <div class="i-simple-icons-nodedotjs" />
              <NTooltip
                class="px0! pb0!"
                content-class="flex flex-col items-center"
              >
                <template #trigger>
                  <div class="truncate max-w-30">{{ item.title }}</div>
                </template>
                <NButton text type="primary" class="mb2 mx3">{{
                  item.title
                }}</NButton>
                <NDivider class="m0!" />
                <NText :depth="3" class="mx3 text-2.5"
                  >Click to open file explorer</NText
                >
              </NTooltip>
            </div>
            <NButton type="primary" size="tiny">Select</NButton>
          </div>
        </NListItem>
      </NList>
    </template>
    <template #resize-trigger>
      <NDivider class="divider m0!" />
    </template>
  </NSplit>
</template>

<style lang="less">
.unconfigurator-integration-internal-package-sidebar {
  margin-bottom: 20px;
  overflow-y: hidden;

  .divider .n-divider__line:hover,
  .divider .n-divider__line:active {
    height: 4px;
    transition: ease-in-out 0.2s;
    background-color: #7fe7c4;
  }

  .n-split__resize-trigger-wrapper {
    height: 0 !important;
  }
}
</style>
