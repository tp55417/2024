<template>
  <div id="emergency" @click="codepeckerOnClick">
    <p>{{ t('landing.emergency.title') }}</p>
    <img class="codepecker" src="@/assets/images/codepecker.png" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { usePopUp, PopUpData } from '@/modules/pop-up'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const { t } = useI18n()
    const { openPopUp, removeAll } = usePopUp()
    const route = useRoute()
    const router = useRouter()
    let isOpen = false

    const popUpOptions = computed<PopUpData>(() => ({
      popupId: 'emergency',
      order: 1,
      metaOptions: {},
      containerData: { type: 'default' },
      contentData: {
        type: 'html',
        html: `
          <h1>${t('landing.emergency.title')}</h1>
          <p>${t('landing.emergency.content')}</p>
        `
      },
      onClose: () => router.push({ query: {} })
    }))

    const codepeckerOnClick = () => {
      isOpen = !isOpen

      if (isOpen) {
        return removeAll()
      }

      openPopUp(popUpOptions.value)
      router.push({ query: { announcement: null } })
    }

    onMounted(() => {
      const query = route.query.announcement
      const read = localStorage.getItem('announcement')

      if (read !== '0319' || query !== undefined) {
        isOpen = true
        openPopUp(popUpOptions.value)
        window.localStorage.setItem('announcement', '0319')
      }
    })

    return { t, codepeckerOnClick }
  },
  mounted () {

    // if (window.localStorage.getItem('emergency0319') !== 'read') {

    // }
  }
})

</script>
<style lang="scss">
#emergency {
  position: fixed;
  z-index: 9999;
  bottom: 20px;
  right: 20px;

  p {
    background-color: #fff;
    color: #000;
    padding: 8px;
    border-radius: 20px;

    &:before {
      content: '';
      display: block;
      border-bottom: 1px solid #fff;
      width: 25px;
      position: absolute;
      transform: rotate(45deg) translate(30px, 15px);
    }
  }

  .codepecker {
    width: 100px;
  }
}

#popup {
  .inner-container {
    font-size: 20px;

    h1 {
      font-size: 2em;
    }

    p {
      margin: 20px 0;
      line-height: 32px;
    }

  }
}
</style>
