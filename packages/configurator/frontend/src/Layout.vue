<script setup lang="tsx">
import { NIcon, NLayoutContent } from 'naive-ui'
import type { Key, MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import menuOptions from 'virtual:unconfigurator/menu'
import { RouterLink } from 'vue-router'
import type { Component } from 'vue'
import AppBarMp3 from './assets/appBar.mp3'

type ExtendMenuMixedOption = MenuMixedOption & {
  to: string
  component?: Function
}

const route = useRoute()
const headerRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)
provide('unconfigurator_header_ref', headerRef)
provide('unconfigurator_footer_ref', footerRef)
provide('unconfigurator_audio_ref', audioRef)
const { width: windowWidth } = useWindowSize()
const { contentHeight } = useContentSize(headerRef, footerRef)
const { playing } = useMediaControls(audioRef)

const renderIcon = (icon: string) => () => <NIcon class={icon} />

const menu = ref(convertMenu(menuOptions))
const collapsed = ref(false)
const currentMenuKey = ref<Key>(null)

provide('unconfigurator_collapsed', collapsed)
watch(
  () => route.fullPath,
  () => {
    // 类型实例化过深，可能无限。
    // eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
    // @ts-ignore
    const value = menu.value.find(item => item.to === route.fullPath)
    if (value && value.key)
      currentMenuKey.value = value.key
  },
  { immediate: true },
)

let CurrentSidebarComponent: null | Component = null
const CurrentSidebarComponentState = ref<boolean>(true)
const showTrigger = ref<boolean | 'bar' | 'arrow-circle'>(true)
function toggleSidebarTrigger() {
  showTrigger.value = CurrentSidebarComponent !== null
    ? windowWidth.value < 768
      ? 'bar'
      : 'arrow-circle'
    : false
}
watch(currentMenuKey, async () => {
  playing.value = true
  // eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
  // @ts-ignore
  const menuObject = menu.value.find(item => item.key === currentMenuKey.value)
  if (!menuObject || !menuObject.component)
    CurrentSidebarComponent = null
  else if (typeof menuObject === 'object' && typeof menuObject.component === 'function')
    CurrentSidebarComponent = defineAsyncComponent(menuObject.component as any)
  else CurrentSidebarComponent = null
  CurrentSidebarComponentState.value = !CurrentSidebarComponentState.value
  nextTick(() => {
    CurrentSidebarComponentState.value = !CurrentSidebarComponentState.value
  })
  toggleSidebarTrigger()
}, { immediate: true })
watch(windowWidth, toggleSidebarTrigger, { immediate: true })

function convertMenu(
  IntegrationSidebarConfig: typeof menuOptions,
): ExtendMenuMixedOption[] {
  return IntegrationSidebarConfig.map(
    ({ component, to, icon, title }): ExtendMenuMixedOption => {
      return {
        key: `${title}-${to}`,
        to,
        label: () => <RouterLink to={to}>{title}</RouterLink>,
        icon: renderIcon(icon),
        component,
      }
    },
  )
}
</script>

<template>
  <div class="fixed w-full h-full top-0 left-0 overflow-hidden">
    <audio ref="audioRef" :src="AppBarMp3" />
    <NLayoutHeader ref="headerRef" bordered class="px2">
      <div>自定义头部</div>
    </NLayoutHeader>

    <NLayout
      position="static"
      has-sider
      class="h-10"
      :style="{ height: `calc(100vh - ${contentHeight}px)` }"
    >
      <!-- Show trigger: 如果有Sidebar Component，则二次判断如果窗口宽度小于768时为bar，否则为arrow-circle。
      如果没有Sidebar Component，则不显示trigger -->
      <NLayoutSider
        v-model:collapsed="collapsed"
        bordered
        :show-trigger="showTrigger"
        collapse-mode="width"
        :collapsed-width="windowWidth < 768 ? 0 : 60"
        :position="
          CurrentSidebarComponent
            ? windowWidth < 768
              ? 'absolute'
              : 'static'
            : undefined
        "
        :width="CurrentSidebarComponent ? undefined : 60"
      >
        <div class="flex w-full h-full overflow-x-hidden">
          <!-- @vue-ignore -->
          <NMenu
            id="unconfigurator_product_menu"
            v-model:value="currentMenuKey"
            class="w-19"
            :collapsed="true"
            :options="menu"
            :collapsed-width="0"
          />
          <NDivider
            v-show="CurrentSidebarComponent && !collapsed"
            vertical
            class="h-full! m0!"
          />
          <div
            v-show="!collapsed"
            v-if="CurrentSidebarComponent"
            id="unconfigurator_app_bar"
            class="w-full"
          >
            <CurrentSidebarComponent v-if="CurrentSidebarComponent && CurrentSidebarComponentState" />
          </div>
        </div>
      </NLayoutSider>

      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>

    <NLayoutFooter ref="footerRef" bordered>
      <NText :depth="3">
        uncli © {{ new Date().getFullYear() }}
      </NText>
    </NLayoutFooter>
  </div>
</template>

<style lang="less">
#unconfigurator_product_menu .n-menu-item-content {
  padding-left: 17px;
}

#unconfigurator_app_bar section {
  .safe {
    padding: 0 10px;
  }

  &::after {
    content: "";
    display: block;
    clear: both;
    width: 100%;
    background-color: #efeff5ff;
    height: 1px;
  }
}

html.dark {
  #unconfigurator_app_bar section {
    &::after {
      background-color: #ffffff17;
    }
  }
}
</style>
