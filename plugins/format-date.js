// <script lang="ts">
  import Vue from "vue";
  // let date = { year: 'numeric', month: 'long', day: 'numeric',};
  // let time = {hour: 'numeric', minute: 'numeric', };

  Vue.filter("formatDate", (dateStr) =>
    Intl.DateTimeFormat("id-ID", { year: 'numeric', month: 'long', day: 'numeric',}).format(new Date(dateStr))
  );

  Vue.filter("formatTime", (dateStr) =>
    Intl.DateTimeFormat("id-ID", {hour: 'numeric', minute: 'numeric', }).format(new Date(dateStr))
  );
// </script>
