<template>
<div class="bookmarkList">
<bookmark-item
    :bookmark="{name: 'location'}"
/>
<bookmark-item
  v-for="bookmark in this.GET_BOOKMARKS"
  :key="bookmark.id"
  :bookmark="bookmark"
  />
</div>
</template>

<script>

import bookmarkItem from "@/components/BookmarkItem";
import {mapGetters} from "vuex";

export default {
  name: "BookmarkList",
  components: {bookmarkItem},
  computed: {
    ...mapGetters([
        'GET_BOOKMARKS',
    ])
  },
}

</script>

<style lang="scss">
  .bookmarkList{
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>