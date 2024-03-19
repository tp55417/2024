<template>
  <div id="emergency" @click="codepeckerOnClick">
    <p>{{ t('landing.emergency.title') }}</p>
    <img class="codepecker" src="@/assets/images/codepecker.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { usePopUp, PopUpData } from '@/modules/pop-up'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup () {
    const { t } = useI18n()
    const { openPopUp, removeAll } = usePopUp()
    let isOpen = false

    const popUpOptions: PopUpData = {
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
      }
    }

    const codepeckerOnClick = () => {
      isOpen = !isOpen

      if (isOpen) {
        return removeAll()
      }

      openPopUp(popUpOptions)
    }

    if (window.localStorage.getItem('emergency0319') !== 'read') {
      isOpen = true
      openPopUp(popUpOptions)
      window.localStorage.setItem('emergency0319', 'read')
    }

    return { t, codepeckerOnClick }
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
