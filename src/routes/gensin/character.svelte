<script>
  import { onMount } from 'svelte';
  // 4. 嵌套組件
  import Icon from '../../../src/components/gensin/Icon.svelte';

  // 1. 添加數據
  let name = '芭芭拉';
  let src = 'images/barbara.png';
  let alt = 'barbara';
  let description = "<p>她是西風教會的牧師</p>"; // 5. HTML 標簽
  let count = 0;
  let isShowDescription = true;

  const iconInfo = {
    src: "images/barbara_icon.png"
  }
  
  /**
   * 7. 響應式聲明
   * 
   * 注意：由于 Svelte 的反应性是由赋值语句触发的，
   *   因此使用数组的诸如 push 和 splice 之类的方法就不会触发自动更新。
   *   可以使用"[...]"來解決。
   */
  $: doubled = count * 2;

  // 8. 響應式聲明語句
  $: console.log(`the count is ${count}`);
  // $: {
  //   console.log(`the count is ${count}`);
  //   console.log(`the count doubled is ${doubled}`);
  // }

  // 15. 生命周期
  onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});

  /**
   * 16. Store
   * - 使用 writable 定義
   * - 調取 store 對象的 subsrcibe 可以監聽變化
   * - set, update 可以修改 store 對象的值
   * - 應該在 onDestory 周期中 使用 unsubsrcibe 取消訂閱
   * - 可以使用 $ 自動訂閱 
   */


  const handleClick = () => {
    count++;
    isShowDescription = !isShowDescription;
  };
</script>

<h2>{name}</h2>

<p>
  <!-- 10. 使用“{...變量}”傳播對象形式的屬性到組件上 -->
  <Icon {...iconInfo}/>
  
  <!-- 2. 動態屬性 -->
  <img {src} alt={alt}>
</p>

<section>
  <p>{count} doubled is {doubled}</p>
  
  <!-- 6. 響應式 -->
  <!-- 13. 綁定事件
    - on:事件名
    - 可以使用箭頭函數傳參
    - 事件修飾符，如：on:click|once
    - 組件外調度組件内事件：組件内事件綁定的方法調用 dispatch('自定義事件名', 參數)
    - 自定義事件不會冒泡，深層監聽需要轉發：不向事件賦值即可轉發。
  -->
  <!-- 14.綁定
    - 可以使用"bind:value={name}"來實現"on:input={event => name = event.target.value}"
    - 組綁定：bind:groug，同一組的單選框互斥；同一組的複選框成爲數組
  -->
  <button type="button" on:click={handleClick}>
    點撃此處
    
    <!-- 11. 條件 -->
    {#if isShowDescription}
      隠藏
    {:else}
      顯示
    {/if}
    
    說明
  </button>

  <div style={isShowDescription ? 'display: flex' : 'display: none'}>
    {@html description}
  </div>
</section>


<!-- 3. CSS 樣式 -->
<style>
  img {
    height: 200px;
  }
</style>
