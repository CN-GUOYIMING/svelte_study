<script>
import { element } from "svelte/internal";

  let elements = ['風', '水', '火', '雷'];
</script>

<ul>
  <!-- 12. 遍歴
    在括號中指定 key 
  -->
  {#each elements as element, index (element)}
    <li>{element}</li>
  {/each}
</ul>

<style>
ul {
  margin-top: 20px;
}
</style>