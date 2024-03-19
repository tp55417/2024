<template>
  <div id="emergency" @click="codepeckerOnClick">
    <p>Emergency</p>
    <img class="codepecker" src="@/assets/images/codepecker.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { usePopUp } from '@/modules/pop-up'

export default defineComponent({
  setup () {
    const { openPopUp, removeAll } = usePopUp()
    let isOpen = false

    const codepeckerOnClick = () => {
      isOpen = !isOpen

      if (isOpen) {
        return removeAll()
      }

      openPopUp({
        popupId: 'emergency',
        order: 1,
        metaOptions: {},
        containerData: { type: 'default' },
        contentData: {
          type: 'html', html: `
          <h1>警急通知</h1>
          <p>社群朋友 / COSCUP 好朋友們好，<br/>籌備志工團隊接獲台電通知，預計於年會當週施行區域性停電維護校區設備。我們正密切地瞭解停電計畫，希望幫社群找到影響最小的方案。 我們一旦有最新異動消息，將會第一時間與各位朋友們通知，也有勞各位密切注意 COSCUP 官網及各社群平臺的最新訊息。</p>
          <p>Dear Community Friends and COSCUP Companions,<br/>We have received a notification from Taiwan Power Company that a planned work blackout is scheduled during the week of our annual conference. We're closely watching the power outage plans to reduce community impact. We will promptly inform everyone of any new updates. Please also keep an eye on the COSCUP official website and our social media platforms for the latest updates.</p>
      `
        }
      })
    }

    return {
      codepeckerOnClick
    }
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
