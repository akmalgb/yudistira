export const state = () => ({
  quiz_scores: [],
  exam_scores: [],
  cbt_scores: [],
  task_scores: [],
  next_page_exam_scores: "",
  next_page_quiz_scores: "",
  next_page_daily_note: "",
  next_page_cbt_scores: "",
  // next_page_task_scores: "",

  last_score_exam: [],

  note: [],
  note_id: "",
  detailNote: [],

  // last_score_quiz: {},
});

export const mutations = {
  set_list_quiz(state, quiz_scores) {
    state.quiz_scores = quiz_scores;
  },
  set_list_exam(state, exam_scores) {
    state.exam_scores = exam_scores;
  },

  set_last_exam(state, last_exam) {
    state.last_score_exam = last_exam;
  },
  set_list_note(state, note) {
    state.note = note;
  },
  set_note_id(state, id) {
    state.note_id = id;
  },
  set_list_cbt(state, cbt_scores) {
    state.cbt_scores = cbt_scores;
  },
  set_list_task(state, task_scores) {
    state.task_scores = task_scores;
  },
  set_detail_note(state, note) {
    state.detailNote = note;
  },
  set_next_page_exam_scores(state, next_page_exam_scores) {
    state.next_page_exam_scores = next_page_exam_scores;
  },
  set_next_page_quiz_scores(state, next_page_quiz_scores) {
    state.next_page_quiz_scores = next_page_quiz_scores;
  },
  set_next_page_daily_note(state, next_page_daily_note) {
    state.next_page_daily_note = next_page_daily_note;
  },
  set_next_page_cbt_scores(state, next_page_cbt_scores) {
    state.next_page_cbt_scores = next_page_cbt_scores;
  },
  // set_next_page_task_scores(state, next_page_task_scores) {
  //   state.next_page_task_scores = next_page_task_scores;
  // },
};

export const actions = {
  async getExamScores({ commit, rootState }, page) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
        params: {
          page: page,
          paginate: true,
        }
      };
      const res = await this.$axios.$get(`performance/get-all-exam/${rootState.child_id}`, config);
      commit("set_list_exam", res.data.data);
      commit("set_next_page_exam_scores", res.data.next_page_url);
    } catch (error) {
      console.error("Error getting exam scores:", error);
    }
  },

  async getDetailNote({ commit, rootState, state }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
      };
      const res = await this.$axios.$get(`student/detail-daily-notes/${state.note_id}`, config);
      commit("set_detail_note", res.data.data);
    } catch (error) {
      console.error("Error getting detail note:", error);
    }
  },

  async getDailyNote({ commit, rootState }, page) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
        params: {
          page: page,
          paginate: true,
        }
      };
      const res = await this.$axios.$get(`student/daily-notes/${rootState.child_id}`, config);
      commit("set_list_note", res.data.data);
      commit("set_next_page_daily_note", res.data.next_page_url);
    } catch (error) {
      console.error("Error getting daily note:", error);
    }
  },

  async getLastExam({ commit, rootState }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
      };
      const res = await this.$axios.$get(`performance/get-last-score/${rootState.child_id}`, config);
      commit("set_last_exam", res.data.data);
    } catch (error) {
      console.error("Error getting last exam:", error);
    }
  },

  async getQuizScores({ commit, rootState }, page) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
        params: {
          page: page,
          paginate: true,
        }
      };
      const res = await this.$axios.$get(`performance/get-all-exam/${rootState.child_id}`, config);
      commit("set_list_quiz", res.data.data);
      commit("set_next_page_quiz_scores", res.data.next_page_url);
    } catch (error) {
      console.error("Error getting quiz scores:", error);
    }
  },

  async getCBTScores({ commit, rootState }, page) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
        params: {
          page: page,
          paginate: true,
        }
      };
      const res = await this.$axios.$get(`performance/get-score-cbt/${rootState.child_id}`, config);
      commit("set_list_cbt", res.data.data);
      commit("set_next_page_cbt_scores", res.data.next_page_url);
    } catch (error) {
      console.error("Error getting cbt scores:", error);
    }
  },

  async getTaskScores({ commit, rootState }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
        // params: {
        //   page: page,
        //   paginate: true,
        // }
      };
      const res = await this.$axios.$get(`task/get-all-task/${rootState.child_id}`, config);
      commit("set_list_task", res.data.Task);
      // commit("set_next_page_task_scores", res.data.next_page_url);
    } catch (error) {
      console.error("Error getting task scores:", error);
    }
  },
};
