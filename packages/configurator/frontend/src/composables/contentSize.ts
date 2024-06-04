import { useElementSize } from '@vueuse/core'
import { type Ref, computed, inject } from 'vue'

/**
 * Get computed content height & header/footer height
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @param {Ref<HTMLElement>} [headerRef]
 * @param {Ref<HTMLElement>} [footerRef]
 */
export function useContentSize(
  headerRef?: Ref<HTMLElement>,
  footerRef?: Ref<HTMLElement>,
) {
  const headerInjected = inject<Ref<HTMLElement> | null>(
    'unconfigurator_header_ref',
    headerRef,
  )
  const footerInjected = inject<Ref<HTMLElement> | null>(
    'unconfigurator_footer_ref',
    footerRef,
  )

  const { height: headerHeight } = useElementSize(headerRef || headerInjected)
  const { height: footerHeight } = useElementSize(footerRef || footerInjected)
  const contentHeight = computed(() => headerHeight.value + footerHeight.value)

  return {
    contentHeight,
    headerHeight,
    footerHeight,
  }
}
