<template>
  <template v-if="store.prizes != null">
    <q-page padding class="q-pa-lg column content-center items-start q-gutter-md">
      <template v-for="prize in store.prizes.prizes" :key="prize.prize_id">
        <PrizeItem :prize="prize" />
      </template>
      <!-- place QPageScroller at end of page -->
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-page>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store/main'
import { useQuasar } from 'quasar'
import PrizeItem from '@/components/PrizeItem.vue'

export default defineComponent({
  name: 'PrizesPage',
  components: { PrizeItem },
  setup () {
    const $q = useQuasar()
    const store = useStore()
    store.$onAction(
      ({
        name, // name of the action
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError // hook if the action throws or rejects
      }) => {
        // a shared variable for this specific action call
        const startTime = Date.now()
        // this will trigger before an action on `store` is executed
        console.log(`Start "${name}" with params [${args.join(', ')}].`)

        // this will trigger if the action succeeds and after it has fully run.
        // it waits for any returned promised
        after((result) => {
          if (name === 'getPrizes') {
            $q.loading.hide()
          }
          console.log(
            `Finished "${name}" after ${Date.now() - startTime
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            }ms.\nResult: ${result}.`
          )
        })

        // this will trigger if the action throws or returns a promise that rejects
        onError((error) => {
          console.warn(
            `Failed "${name}" after ${Date.now() - startTime
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            }ms.\nError: ${error}.`
          )
        })
      }
    )

    void store.getPrizes()
    $q.loading.show()
    return { store }
  }
})
</script>
