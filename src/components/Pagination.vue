<template>
  <nav v-if="totalPages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="previousPage">Previous</button>
      </li>

      <li v-for="page in pages" :key="page" :class="{ active: currentPage === page }" class="page-item">
        <button class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="nextPage">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['updatePage'],
  computed: {
    pages() {
      const pages: (number | string)[] = [];
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.totalPages, this.currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...')
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) pages.push('...');
        pages.push(this.totalPages);
      }

      return pages;
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('updatePage', this.currentPage + 1);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('updatePage', this.currentPage - 1);
      }
    },
    changePage(page: number | string) {
      if (typeof page === 'number') {
        this.$emit('updatePage', page);
      }
    },
  },
});
</script>

<style scoped>
.pagination {
  margin: 20px 0;
}
.page-link {
  cursor: pointer;
}
.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}
.page-item.disabled .page-link {
  pointer-events: none;
}

.pagination {
  margin: 20px 0;
}

.page-link {
  cursor: pointer;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  pointer-events: none;
}

body.dark-mode .page-link {
  background-color: #3a3a3a;
  color: #ffffff;
  border: 1px solid #555;
}

body.dark-mode .page-item.active .page-link {
  background-color: #6200ea;
  color: #ffffff;
}

body.dark-mode .page-item.disabled .page-link {
  pointer-events: none;
}

</style>
