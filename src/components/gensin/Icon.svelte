<script>
  import { createEventDispatcher } from 'svelte'
  // 9. 接收 props
  export let src;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    // createEventDispatcher() -> dispatch('事件名', detail)
    dispatch('click', {
      text: 'Click Picture Success!'
    });
  };
</script>

<img {src} alt="character" on:click={handleClick}>

<style>
  img {
    margin-left: 10px;
  }
</style>