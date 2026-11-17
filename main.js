import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBnOc_X0L4AUgbABO7aSaGFQq5I59lB7mo",
    authDomain: "vocabularyapp-20ac4.firebaseapp.com",
    databaseURL: "https://vocabularyapp-20ac4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vocabularyapp-20ac4",
    storageBucket: "vocabularyapp-20ac4.firebasestorage.app",
    messagingSenderId: "484616343794",
    appId: "1:484616343794:web:5047bc769c441dd18e806b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const vocabRef = ref(db, "vocabulary");

/*
  Các dữ liệu học tập cần đồng bộ giữa
  nhiều trình duyệt và thiết bị.
*/
const wordStatsRef = ref(
  db,
  "learningData/wordStats"
);

const exampleStatsRef = ref(
  db,
  "learningData/exampleStats"
);

const studyAttendanceRef = ref(
  db,
  "learningData/studyAttendance"
);
const defaultVocab = [
  
];
const categorySelectToggle = document.getElementById('categorySelectToggle');
const categorySelectPanel = document.getElementById('categorySelectPanel');
const categorySelectSummary = document.getElementById('categorySelectSummary');
const tagSelect = document.getElementById('tagSelectPanel');
const tagSelectToggle = document.getElementById('tagSelectToggle');
const tagSelectSummary = document.getElementById('tagSelectSummary');
const clearTagSelectionBtn = document.getElementById('clearTagSelectionBtn');
const reviewModeSelect = document.getElementById('reviewModeSelect');
const quizTypeSelect = document.getElementById('quizTypeSelect');
const directionSelect = document.getElementById('directionSelect');
const exampleDirectionOption = document.getElementById('exampleDirectionOption');
const speechRateSelect =
  document.getElementById('speechRateSelect');
const quizCountSelect = document.getElementById('quizCountSelect');
const darkModeToggle =  document.getElementById('darkModeToggle');
const firebaseLoginBtn =
    document.getElementById("firebaseLoginBtn");
const firebaseUserStatus =
  document.getElementById(
    "firebaseUserStatus"
  );

const firebaseUserStatusText =
  document.getElementById(
    "firebaseUserStatusText"
  );

let firebaseSyncStarted = false;
const learnModeBtn = document.getElementById('learnModeBtn');
const studyDaysWrapper =  document.getElementById('studyDaysWrapper');
const studyDaysBtn = document.getElementById('studyDaysBtn');
const studyDaysCount =  document.getElementById('studyDaysCount');
const studyDaysPanel =  document.getElementById('studyDaysPanel');
const studyDaysPanelCount = document.getElementById('studyDaysPanelCount');
const studyAttendanceStatus =  document.getElementById('studyAttendanceStatus');
const studyAttendanceBtn = document.getElementById('studyAttendanceBtn');
const quizModeBtn = document.getElementById('quizModeBtn');
const learnPanel = document.getElementById('learnPanel');
const quizPanel = document.getElementById('quizPanel');
const practiceModeBtn =
  document.getElementById('practiceModeBtn');

const practicePanel =
  document.getElementById('practicePanel');

// ========================================
// CÁC PHẦN TỬ CỦA CHẾ ĐỘ BÀI HỌC
// ========================================

const lessonModeBtn =
  document.getElementById('lessonModeBtn');
const speechAccentSelect =
  document.getElementById('speechAccentSelect');

const lessonPanel =
  document.getElementById('lessonPanel');

const lessonTagSearch =
  document.getElementById('lessonTagSearch');

const lessonTagList =
  document.getElementById('lessonTagList');

const lessonWordList =
  document.getElementById('lessonWordList');

const lessonWordCount =
  document.getElementById('lessonWordCount');

const mainGrid =
  document.querySelector('.main-grid');


const practiceCodeInput =
  document.getElementById('practiceCodeInput');

const runPracticeBtn =
  document.getElementById('runPracticeBtn');

const clearPracticeCodeBtn =
  document.getElementById('clearPracticeCodeBtn');

const practiceCodeError =
  document.getElementById('practiceCodeError');

const practiceWorkspace =
  document.getElementById('practiceWorkspace');

const practiceTitle =
  document.getElementById('practiceTitle');

const practiceInstructions =
  document.getElementById('practiceInstructions');

const practicePassage =
  document.getElementById('practicePassage');

const practiceQuestions =
  document.getElementById('practiceQuestions');

const practiceScore =
  document.getElementById('practiceScore');

const checkAllPracticeBtn =
  document.getElementById('checkAllPracticeBtn');

const resetPracticeBtn =
  document.getElementById('resetPracticeBtn');

const panelTop =
  document.querySelector('.panel-top');
const flashFront = document.getElementById('flashFront');
const flashBack = document.getElementById('flashBack');
const flashCategory = document.getElementById('flashCategory');
const flashSpeakBtn = document.getElementById('flashSpeakBtn');
const flipBtn = document.getElementById('flipBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionNumber = document.getElementById('questionNumber');
const scoreDisplay = document.getElementById('scoreDisplay');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const typingContainer = document.getElementById('typingContainer');
const matchContainer = document.getElementById('matchContainer');
const matchEnglishColumn = document.getElementById('matchEnglishColumn');
const matchVietnameseColumn = document.getElementById('matchVietnameseColumn');
const matchMessage = document.getElementById('matchMessage');
const listenContainer = document.getElementById('listenContainer');
const listenButton = document.getElementById('listenButton');
const listenInput = document.getElementById('listenInput');
const submitListen = document.getElementById('submitListen');
const typingInput = document.getElementById('typingInput');
const submitTyping = document.getElementById('submitTyping');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const restartBtn = document.getElementById('restartBtn');
const quizQuestionCard = document.getElementById('quizQuestionCard')
const quizResultPanel = document.getElementById('quizResultPanel');
const quizResultSummary = document.getElementById('quizResultSummary');
const quizWrongList = document.getElementById('quizWrongList');
const quizActions = document.getElementById('quizActions');
const addWordBtn = document.getElementById('addWordBtn');
const newWordEng = document.getElementById('newWordEng');
const newWordVn = document.getElementById('newWordVn');
const meaningsDisplay = document.getElementById('meaningsDisplay');
const newWordCategory = document.getElementById('newWordCategory');
const categoriesDisplay = document.getElementById('categoriesDisplay');
const newWordCategoryPanel = document.getElementById('newWordCategoryPanel');
const newWordTagsInput = document.getElementById('newWordTagsInput');
const newWordTagsPanel = document.getElementById('newWordTagsPanel');
const newWordExamplesInput = document.getElementById('newWordExamplesInput');
const newWordExamplesPanel = document.getElementById('newWordExamplesPanel');
const addTagBtn = document.getElementById('addTagBtn');
const tagsDisplay = document.getElementById('tagsDisplay');
const examplesDisplay = document.getElementById('examplesDisplay');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const vocabList = document.getElementById('vocabList');
const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
const editWordEng = document.getElementById('editWordEng');
const editWordVn = document.getElementById('editWordVn');
const editMeaningsDisplay = document.getElementById('editMeaningsDisplay');
const editWordExamplesInput = document.getElementById('editWordExamplesInput');
const editExamplesDisplay =document.getElementById('editExamplesDisplay');
const editWordCategory =  document.getElementById('editWordCategory');
const editWordCategoryPanel = document.getElementById('editWordCategoryPanel');
const editWordTagsInput = document.getElementById('editWordTagsInput');
const editWordTagsPanel = document.getElementById('editWordTagsPanel');
const editAddTagBtn = document.getElementById('editAddTagBtn');
const editTagsDisplay = document.getElementById('editTagsDisplay');
const editWordStats = document.getElementById('editWordStats');
const saveEditWord = document.getElementById('saveEditWord');
const cancelEditWord = document.getElementById('cancelEditWord');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFileInput = document.getElementById('importFileInput');
const statsSummary = document.getElementById('statsSummary');
const deviceModal = document.getElementById('deviceModal');
const deviceMobileBtn = document.getElementById('deviceMobileBtn');
const deviceDesktopBtn = document.getElementById('deviceDesktopBtn');
const deviceToggleBtn = document.getElementById('deviceToggleBtn');
const closeDeviceModal = document.getElementById('closeDeviceModal');
const resetStatsModal = document.getElementById( 'resetStatsModal' );
const closeResetStatsModalBtn = document.getElementById(  'closeResetStatsModal' );
const resetWordStatsCheckbox = document.getElementById(  'resetWordStatsCheckbox' );
const resetExampleStatsCheckbox = document.getElementById( 'resetExampleStatsCheckbox' );
const resetWordStatsCount = document.getElementById(  'resetWordStatsCount' );
const resetExampleStatsCount = document.getElementById('resetExampleStatsCount');
const resetStatsWarning = document.getElementById( 'resetStatsWarning' );
const cancelResetStatsBtn = document.getElementById( 'cancelResetStatsBtn' );
const confirmResetStatsBtn = document.getElementById( 'confirmResetStatsBtn');
const statsKey = 'openquizStats';
const exampleStatsKey = 'openquizExampleStats';
/* Khóa lưu dữ liệu điểm danh trong trình duyệt */
const studyAttendanceKey = 'openquizStudyAttendance';
let vocab = [];
let filteredVocab = [];
let wordStats = {};
let exampleStats = {};
let currentFlashcard = null;
let currentIndex = 0;
let isFlipped = false;
let score = 0;
let currentQuestion = null;
let questions = [];
let quizWrongAnswers = [];
let quizFinished = false;
let currentPracticeLesson = null;
let currentMatchSelection = { english: null, vietnamese: null };
let currentMatchItems = [];
let editingWordIndex = null;
let editingWordId = null;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let selectedCategories = [];
let selectedTags = [];
let selectedExamples = [];
let selectedLessonTag = '';
// Giọng mặc định là Anh-Mỹ
let selectedSpeechAccent = 'en-US';
let editSelectedTags = [];
let editSelectedExamples = [];
let editSelectedVietnameseMeanings = [];
let selectedNewWordCategories = [];
let selectedVietnameseMeanings = [];
const dataKey = 'openquizVocab';
const latestExportVersion = 1;

function makeWordId(item) {
  return `${item.english}|${item.vietnamese}|${getCategoryList(item).join(',')}|${item.topic || ''}`;
}

function showNotification(message, duration = 2000) {
  const notification = document.getElementById('notification');
  if (!notification) return;
  
  notification.textContent = message;
  notification.classList.remove('hidden', 'hide');
  
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 300);
  }, duration);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeVietnameseMeaning(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeVietnameseMeanings(value) {
  if (!value) return [];

  const values = Array.isArray(value)
    ? value
    : String(value).split(/[,;|\n]+/);

  const meanings = values
    .map(item => normalizeVietnameseMeaning(item))
    .filter(Boolean);

  return meanings.filter((meaning, index, array) => {
    const normalizedMeaning = normalizeText(meaning);

    return array.findIndex(
      item => normalizeText(item) === normalizedMeaning
    ) === index;
  });
}

function normalizeVietnameseValue(value) {
  return normalizeVietnameseMeanings(value).join(' | ');
}

function displaySelectedMeanings() {
  if (!meaningsDisplay) return;

  meaningsDisplay.innerHTML = selectedVietnameseMeanings
    .map(meaning => `
      <div class="tag-chip">
        <span>${escapeHtml(meaning)}</span>
        <button
          type="button"
          data-meaning="${escapeHtml(meaning)}"
          aria-label="Xóa nghĩa"
        >
          ×
        </button>
      </div>
    `)
    .join('');

  meaningsDisplay
    .querySelectorAll('button[data-meaning]')
    .forEach(button => {
      button.addEventListener('click', () => {
        removeVietnameseMeaning(button.dataset.meaning || '');
      });
    });
}

function addVietnameseMeaning(value) {
  const meaning = normalizeVietnameseMeaning(value);

  if (!meaning) return;

  const alreadyExists = selectedVietnameseMeanings.some(
    item => normalizeText(item) === normalizeText(meaning)
  );

  if (!alreadyExists) {
    selectedVietnameseMeanings.push(meaning);
    displaySelectedMeanings();
  }

  newWordVn.value = '';
  newWordVn.focus();
}

function removeVietnameseMeaning(meaning) {
  selectedVietnameseMeanings =
    selectedVietnameseMeanings.filter(item => item !== meaning);

  displaySelectedMeanings();
  newWordVn.focus();
}

function resetVietnameseMeanings() {
  selectedVietnameseMeanings = [];
  newWordVn.value = '';
  displaySelectedMeanings();
}

function displayEditSelectedMeanings() {
  if (!editMeaningsDisplay) return;

  editMeaningsDisplay.innerHTML =
    editSelectedVietnameseMeanings
      .map(meaning => `
        <div class="tag-chip">
          <span>${escapeHtml(meaning)}</span>

          <button
            type="button"
            data-edit-meaning="${escapeHtml(meaning)}"
            aria-label="Xóa nghĩa"
          >
            ×
          </button>
        </div>
      `)
      .join('');

  editMeaningsDisplay
    .querySelectorAll('button[data-edit-meaning]')
    .forEach(button => {
      button.addEventListener('click', () => {
        removeEditVietnameseMeaning(
          button.dataset.editMeaning || ''
        );
      });
    });
}

function addEditVietnameseMeaning(value) {
  const meaning = normalizeVietnameseMeaning(value);

  if (!meaning) return;

  const existed = editSelectedVietnameseMeanings.some(
    item => normalizeText(item) === normalizeText(meaning)
  );

  if (!existed) {
    editSelectedVietnameseMeanings.push(meaning);
    displayEditSelectedMeanings();
  }

  editWordVn.value = '';
  editWordVn.focus();
}

function removeEditVietnameseMeaning(meaning) {
  editSelectedVietnameseMeanings =
    editSelectedVietnameseMeanings.filter(
      item => item !== meaning
    );

  displayEditSelectedMeanings();
  editWordVn.focus();
}

function resetEditVietnameseMeanings() {
  editSelectedVietnameseMeanings = [];

  if (editWordVn) {
    editWordVn.value = '';
  }

  displayEditSelectedMeanings();
}

function displaySelectedTags() {
  tagsDisplay.innerHTML = selectedTags
    .map(tag => `
      <div class="tag-chip">
        <span>${escapeHtml(tag)}</span>
        <button type="button" data-tag="${escapeHtml(tag)}">×</button>
      </div>
    `)
    .join('');

  tagsDisplay.querySelectorAll("button[data-tag]").forEach(button => {
    button.addEventListener("click", () => {
      removeTag(button.dataset.tag);
    });
  });
}

function displaySelectedExamples() {
  if (!examplesDisplay) return;
  examplesDisplay.innerHTML = selectedExamples
    .map(example => `
      <div class="tag-chip">
        <span>${escapeHtml(example)}</span>
        <button type="button" data-example="${escapeHtml(example)}">×</button>
      </div>
    `)
    .join('');
  examplesDisplay.querySelectorAll('button[data-example]').forEach(button => {
    button.addEventListener('click', () => removeExample(button.dataset.example || ''));
  });
}

function addTag(tagText) {
  const normalizedTag = tagText.trim().charAt(0).toUpperCase() + tagText.trim().slice(1).toLowerCase();
  if (!normalizedTag) return;
  if (!selectedTags.includes(normalizedTag)) {
    selectedTags.push(normalizedTag);
    displaySelectedTags();
  }
  newWordTagsInput.value = '';
  refreshNewWordTagsPanel();
}

function removeTag(tag) {
  selectedTags = selectedTags.filter(t => t !== tag);
  displaySelectedTags();
  refreshNewWordTagsPanel();
}

function resetTags() {
  selectedTags = [];
  displaySelectedTags();
  newWordTagsInput.value = '';
  refreshNewWordTagsPanel();
}

function normalizeExampleText(exampleText) {
  return (exampleText || '').trim().replace(/\s+/g, ' ');
}

function addExample(exampleText) {
  const normalizedExample = normalizeExampleText(exampleText);
  if (!normalizedExample) return;
  if (!selectedExamples.some(example => normalizeText(example) === normalizeText(normalizedExample))) {
    selectedExamples.push(normalizedExample);
    displaySelectedExamples();
  }
  if (newWordExamplesInput) {
    newWordExamplesInput.value = '';
  }
  refreshNewWordExamplesPanel();
}

function removeExample(example) {
  selectedExamples = selectedExamples.filter(item => item !== example);
  displaySelectedExamples();
  refreshNewWordExamplesPanel();
}

function resetExamples() {
  selectedExamples = [];
  displaySelectedExamples();
  if (newWordExamplesInput) {
    newWordExamplesInput.value = '';
  }
  refreshNewWordExamplesPanel();
}
function displaySelectedCategories() {
  if (!categoriesDisplay) return;

  categoriesDisplay.innerHTML =
    selectedNewWordCategories
      .map(category => `
        <div class="tag-chip">
          <span>
            ${escapeHtml(category)}
          </span>

          <button
            type="button"
            data-category="${escapeHtml(category)}"
            aria-label="Xóa loại từ"
          >
            ×
          </button>
        </div>
      `)
      .join('');

  categoriesDisplay
    .querySelectorAll(
      'button[data-category]'
    )
    .forEach(button => {
      button.addEventListener(
        'click',
        () => {
          removeNewWordCategory(
            button.dataset.category || ''
          );
        }
      );
    });
}

function addNewWordCategory(categoryText) {
  const category =
    normalizeCategory(categoryText);

  if (!category) return;

  const alreadyExists =
    selectedNewWordCategories.some(
      item =>
        normalizeText(item) ===
        normalizeText(category)
    );

  if (!alreadyExists) {
    selectedNewWordCategories.push(
      category
    );

    selectedNewWordCategories.sort(
      (left, right) =>
        left.localeCompare(right)
    );

    displaySelectedCategories();
  }

  if (newWordCategory) {
    newWordCategory.value = '';
    newWordCategory.focus();
  }

  refreshNewWordCategoryPanel();
}

function removeNewWordCategory(category) {
  selectedNewWordCategories =
    selectedNewWordCategories.filter(
      item => item !== category
    );

  displaySelectedCategories();
  refreshNewWordCategoryPanel();

  newWordCategory?.focus();
}

function toggleNewWordCategory(categoryText) {
  const category =
    normalizeCategory(categoryText);

  if (!category) return;

  const exists =
    selectedNewWordCategories.some(
      item =>
        normalizeText(item) ===
        normalizeText(category)
    );

  if (exists) {
    removeNewWordCategory(category);
  } else {
    addNewWordCategory(category);
  }
}

function resetNewWordCategories() {
  selectedNewWordCategories = [];

  if (newWordCategory) {
    newWordCategory.value = '';
  }

  displaySelectedCategories();
  refreshNewWordCategoryPanel();
}

function displayEditSelectedTags() {
  editTagsDisplay.innerHTML = editSelectedTags
    .map(tag => `
      <div class="tag-chip">
        <span>${escapeHtml(tag)}</span>
        <button type="button" data-tag="${escapeHtml(tag)}">×</button>
      </div>
    `)
    .join('');

  editTagsDisplay.querySelectorAll("button[data-tag]").forEach(button => {
    button.addEventListener("click", () => {
      removeEditTag(button.dataset.tag);
    });
  });
}

function addEditTag(tagText) {
  const trimmedTag = String(tagText || '').trim();

  if (!trimmedTag) return;

  const existingTag = getTags().find(
    tag => normalizeText(tag) === normalizeText(trimmedTag)
  );

  const normalizedTag = existingTag || (
    trimmedTag.charAt(0).toUpperCase() +
    trimmedTag.slice(1).toLowerCase()
  );

  const alreadySelected = editSelectedTags.some(
    tag => normalizeText(tag) === normalizeText(normalizedTag)
  );

  if (!alreadySelected) {
    editSelectedTags.push(normalizedTag);
    displayEditSelectedTags();
  }

  editWordTagsInput.value = '';
  refreshEditWordTagsPanel();
}

function removeEditTag(tag) {
  editSelectedTags = editSelectedTags.filter(
    item => item !== tag
  );

  displayEditSelectedTags();
  refreshEditWordTagsPanel();
}

function resetEditTags() {
  editSelectedTags = [];
  displayEditSelectedTags();

  if (editWordTagsInput) {
    editWordTagsInput.value = '';
  }

  refreshEditWordTagsPanel();
}

function displayEditSelectedExamples() {
  if (!editExamplesDisplay) return;

  editExamplesDisplay.innerHTML =
    editSelectedExamples
      .map((example, index) => `
        <div class="tag-chip">
          <span>${escapeHtml(example)}</span>

          <button
            type="button"
            data-example-index="${index}"
            aria-label="Xóa ví dụ"
          >
            ×
          </button>
        </div>
      `)
      .join('');

  editExamplesDisplay
    .querySelectorAll('button[data-example-index]')
    .forEach(button => {
      button.addEventListener('click', () => {
        const index = Number(
          button.dataset.exampleIndex
        );

        removeEditExample(index);
      });
    });
}

function addEditExample(value) {
  const example = normalizeExampleText(value);

  if (!example) return;

  const existed = editSelectedExamples.some(
    item =>
      normalizeText(item) === normalizeText(example)
  );

  if (!existed) {
    editSelectedExamples.push(example);
    displayEditSelectedExamples();
  }

  if (editWordExamplesInput) {
    editWordExamplesInput.value = '';
    editWordExamplesInput.focus();
  }
}

function removeEditExample(index) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= editSelectedExamples.length
  ) {
    return;
  }

  editSelectedExamples.splice(index, 1);
  displayEditSelectedExamples();

  editWordExamplesInput?.focus();
}

function resetEditExamples() {
  editSelectedExamples = [];

  if (editWordExamplesInput) {
    editWordExamplesInput.value = '';
  }

  displayEditSelectedExamples();
}

function normalizeTags(tagsText) {
  if (!tagsText) return [];

  const values = Array.isArray(tagsText)
    ? tagsText
    : String(tagsText).split(/[;,\n]+/);

  return [...new Set(
    values
      .map(tag => String(tag).trim())
      .filter(Boolean)
      .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase())
  )];
}

function normalizeExamples(examplesValue) {
  if (!examplesValue) return [];

  const values = Array.isArray(examplesValue)
    ? examplesValue
    : String(examplesValue).split(/[\n]+/);

  return [...new Set(
    values
      .map(item => normalizeExampleText(item))
      .filter(Boolean)
  )];
}

function getExamples() {
  const examples = new Set();
  vocab.forEach(item => {
    normalizeExamples(item.examples).forEach(example => examples.add(example));
  });
  return [...examples];
}

function getTagsDisplay(item) {
  return Array.isArray(item.tags) ? item.tags.join(', ') : '';
}

function ensureReviewFields(item = {}) {
  return {
    /*
      Tổng số lần trả lời đúng.
      Chỉ dùng cho thống kê.
    */
    correct: 0,

    /*
      Tổng số lần trả lời sai trong toàn bộ lịch sử.
      Không xóa khi đạt 10/10.
    */
    wrong: 0,

    /*
      Số lần đúng liên tiếp sau lần sai gần nhất.
    */
    correctStreak: 0,

    /*
      Số lần đã học rồi nhưng sau đó làm sai lại.
      Dùng để tăng mức ưu tiên ôn tập.
    */
    lapses: 0,

    /*
      Đã đạt 10 lần đúng liên tiếp.
    */
    mastered: false,

    starred: false,

    /*
      Ngày cần ôn tiếp.
    */
    due: null,

    /*
      Khoảng cách ôn hiện tại.
    */
    intervalDays: 0,

    lastReviewed: null,

    ...item
  };
}

function getQuestionExamples(item) {
  return normalizeExamples(item?.examples);
}

function getListenSpeechText(item) {
  if (!item) return '';

  const direction = directionSelect.value;

  if (direction === 'example') {
    return String(item.quizExample || '').trim();
  }

  // Hướng VN → EN, nếu được sử dụng:
  // phát âm tiếng Việt.
  if (direction === 'vnToEn') {
    return String(item.vietnamese || '').trim();
  }

  // Cả enToVn và enToEn đều phát âm tiếng Anh.
  return String(item.english || '').trim();
}

function getListenAnswer(item) {
  if (!item) return '';

  const direction = directionSelect.value;

  if (direction === 'example') {
    return String(item.quizExample || '').trim();
  }

  // Nghe tiếng Anh → viết tiếng Việt.
  if (direction === 'enToVn') {
    return String(item.vietnamese || '').trim();
  }

  // Nghe tiếng Anh → viết tiếng Anh.
  return String(item.english || '').trim();
}

function normalizeListenAnswer(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')

    // Đổi các kiểu dấu nháy cong thành dấu nháy đơn chuẩn
    .replace(/[’‘`´]/g, "'")

    // Giữ chữ, số, khoảng trắng và dấu nháy đơn
    // Bỏ qua tất cả ký hiệu còn lại
    .replace(/[^a-z0-9\s']/g, '')

    // Chuẩn hóa khoảng trắng
    .replace(/\s+/g, ' ')
    .trim();
}



function updateDirectionOptions() {
  if (!directionSelect) return;

  const isListenMode =
    quizTypeSelect?.value === 'listen';

  const enToVnOption =
    directionSelect.querySelector(
      'option[value="enToVn"]'
    );

  const vnToEnOption =
    directionSelect.querySelector(
      'option[value="vnToEn"]'
    );

  let enToEnOption =
    directionSelect.querySelector(
      'option[value="enToEn"]'
    );

  let exampleOption =
    directionSelect.querySelector(
      'option[value="example"]'
    );

  if (isListenMode) {
    // Giữ hướng nghe tiếng Anh, viết tiếng Việt.
    if (enToVnOption) {
      enToVnOption.textContent =
        'Nghe tiếng Anh → Viết tiếng Việt';
    }

    // Ẩn hướng nghe tiếng Việt, viết tiếng Anh
    // chỉ trong chế độ Nghe và viết.
    if (vnToEnOption) {
      vnToEnOption.hidden = true;
    }

    if (directionSelect.value === 'vnToEn') {
      directionSelect.value = 'enToVn';
    }

    // Thêm hướng mới: nghe tiếng Anh, viết tiếng Anh.
    if (!enToEnOption) {
      enToEnOption =
        document.createElement('option');

      enToEnOption.value = 'enToEn';
      enToEnOption.textContent =
        'Nghe tiếng Anh → Viết tiếng Anh';

      directionSelect.insertBefore(
        enToEnOption,
        exampleOption || null
      );
    }

    // Giữ lựa chọn Example.
    if (!exampleOption) {
      exampleOption =
        document.createElement('option');

      exampleOption.id = 'exampleDirectionOption';
      exampleOption.value = 'example';
      exampleOption.textContent = 'Example';

      directionSelect.appendChild(exampleOption);
    }
  } else {
    // Khôi phục hướng học trong các chế độ Quiz khác.
    if (enToVnOption) {
      enToVnOption.textContent = 'EN → VN';
    }

    if (vnToEnOption) {
      vnToEnOption.hidden = false;
    }

    // Hướng enToEn chỉ dùng trong Nghe và viết.
    if (
      directionSelect.value === 'example' ||
      directionSelect.value === 'enToEn'
    ) {
      directionSelect.value = 'enToVn';
    }

    enToEnOption?.remove();
    exampleOption?.remove();
  }
}


function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesQuery(text, query) {
  if (!query) return true;
  return normalizeText(text).includes(query);
}

function getEnglishVariants(item) {
  const raw = Array.isArray(item.english)
    ? item.english
    : String(item.english || '').split('|');

  return raw
    .map(word => normalizeText(word))
    .filter(Boolean);
}

function loadStats() {
  const saved = localStorage.getItem(statsKey);
  if (!saved) {
    wordStats = {};
    return;
  }
  try {
    const parsed = JSON.parse(saved) || {};
    wordStats = Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, ensureReviewFields(value)]));
  } catch {
    wordStats = {};
  }
}

function saveStats() {
  /*
    Giữ một bản trong trình duyệt
    để vẫn sử dụng được khi mất mạng.
  */
  const statsJson =
    JSON.stringify(wordStats);

  localStorage.setItem(
    statsKey,
    statsJson
  );

  /*
    Lưu dạng chuỗi JSON lên Firebase.

    Không lưu trực tiếp object wordStats vì
    ID từ vựng có thể chứa dấu chấm, dấu gạch
    hoặc ký tự Firebase không cho dùng làm key.
  */
  set(wordStatsRef, statsJson)
    .then(() => {
      console.log(
        "Đã đồng bộ thống kê từ vựng."
      );
    })
    .catch(error => {
      console.error(
        "Không thể đồng bộ thống kê từ vựng:",
        error
      );
    });
}

function makeExampleId(exampleText) {
  return normalizeListenAnswer(exampleText);
}

function ensureExampleStatsFields(stats = {}) {
  return {
    /*
      Tổng số lần đúng.
    */
    correct: 0,

    /*
      Tổng số lần sai trong lịch sử.
      Không xóa khi đạt 10/10.
    */
    wrong: 0,

    /*
      Đúng liên tiếp sau lần sai gần nhất.
    */
    correctStreak: 0,

    /*
      Số lần đã học rồi nhưng quên lại.
    */
    lapses: 0,

    mastered: false,

    appeared: 0,

    /*
      Cho Example dùng cùng cơ chế
      ôn cách quãng với từ vựng.
    */
    intervalDays: 0,
    due: null,

    lastReviewed: null,

    ...stats
  };
}

function loadExampleStats() {
  const saved =
    localStorage.getItem(exampleStatsKey);

  if (!saved) {
    exampleStats = {};
    return;
  }

  try {
    const parsed = JSON.parse(saved) || {};

    exampleStats = Object.fromEntries(
      Object.entries(parsed).map(
        ([exampleId, stats]) => [
          exampleId,
          ensureExampleStatsFields(stats)
        ]
      )
    );
  } catch {
    exampleStats = {};
  }
}

function saveExampleStats() {
  const statsJson =
    JSON.stringify(exampleStats);

  /*
    Lưu trong trình duyệt để dùng offline.
  */
  localStorage.setItem(
    exampleStatsKey,
    statsJson
  );

  /*
    Đồng bộ lên Firebase dưới dạng chuỗi JSON.
    Example thường chứa dấu chấm và ký tự đặc biệt,
    vì vậy không nên lưu trực tiếp làm object key.
  */
  set(exampleStatsRef, statsJson)
    .then(() => {
      console.log(
        "Đã đồng bộ thống kê Example."
      );
    })
    .catch(error => {
      console.error(
        "Không thể đồng bộ thống kê Example:",
        error
      );
    });
}
function normalizeCategory(category) {
  if (!category) return 'Tự tạo';
  return category
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function normalizeCategorySelection(categoryValue) {
  if (!categoryValue) return [];
  const values = Array.isArray(categoryValue)
    ? categoryValue
    : String(categoryValue).split(/[;,\n|]+/);
  return [...new Set(values.map(item => normalizeCategory(item)).filter(Boolean))].sort((left, right) => left.localeCompare(right));
}

function getCategoryList(item) {
  return normalizeCategorySelection(item?.category);
}

function getCategoryDisplay(item) {
  const categories = getCategoryList(item);
  return categories.length > 0 ? categories.join(', ') : 'Tự tạo';
}

function itemMatchesCategory(item, category) {
  if (!category || category === 'Tất cả') return true;
  return getCategoryList(item).includes(category);
}

function getSuggestionItems(items, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return items;
  return items.filter(item => normalizeText(item).includes(normalizedQuery));
}

function renderOptionPanel(panel, items, onPick, emptyText = 'Không có dữ liệu.') {
  if (!panel) return;
  if (!items.length) {
    panel.innerHTML = `<div class="field-dropdown-empty">${emptyText}</div>`;
    return;
  }
  panel.innerHTML = items
    .map(item => `<button type="button" class="field-dropdown-option" data-value="${item}">${item}</button>`)
    .join('');
  panel.querySelectorAll('.field-dropdown-option').forEach(button => {
    button.addEventListener('click', () => onPick(button.dataset.value));
  });
}

function openFieldPanel(panel) {
  if (!panel) return;
  panel.classList.remove('hidden');
}

function closeFieldPanel(panel) {
  if (!panel) return;
  panel.classList.add('hidden');
}

function refreshNewWordCategoryPanel() {
  if (!newWordCategoryPanel) return;
  const items = getSuggestionItems(getCategories().filter(item => item !== 'Tất cả'), newWordCategory?.value || '');
  if (!items.length) {
    newWordCategoryPanel.innerHTML = '<div class="field-dropdown-empty">Chưa có loại từ nào.</div>';
    return;
  }
  const activeCategories = new Set(selectedNewWordCategories);
  newWordCategoryPanel.innerHTML = items
    .map(category => `
      <button type="button" class="field-dropdown-option${activeCategories.has(category) ? ' active' : ''}" data-value="${category}">
        ${category}
      </button>
    `)
    .join('');
  newWordCategoryPanel.querySelectorAll('.field-dropdown-option').forEach(button => {
    button.addEventListener('click', () => toggleNewWordCategory(button.dataset.value));
  });
}

function getEditCategoryValues() {
  return normalizeCategorySelection(
    editWordCategory?.value || ''
  );
}

function refreshEditWordCategoryPanel() {
  if (!editWordCategoryPanel) return;

  const existingCategories = getCategories()
    .filter(category => category !== 'Tất cả');

  const inputValue = editWordCategory?.value || '';

  // Chỉ lấy nội dung đang nhập sau dấu phẩy cuối cùng
  const query = inputValue
    .split(',')
    .pop()
    .trim();

  const items = getSuggestionItems(
    existingCategories,
    query
  );

  if (items.length === 0) {
    editWordCategoryPanel.innerHTML = `
      <div class="field-dropdown-empty">
        Không tìm thấy loại từ phù hợp.
      </div>
    `;
    return;
  }

  const currentCategories = new Set(
    getEditCategoryValues()
  );

  editWordCategoryPanel.innerHTML = items
    .map(category => `
      <button
        type="button"
        class="field-dropdown-option${
          currentCategories.has(category)
            ? ' active'
            : ''
        }"
        data-value="${escapeHtml(category)}"
      >
        ${escapeHtml(category)}
      </button>
    `)
    .join('');

  editWordCategoryPanel
    .querySelectorAll('.field-dropdown-option')
    .forEach(button => {
      button.addEventListener('click', () => {
        toggleEditWordCategory(
          button.dataset.value || ''
        );
      });
    });
}

function toggleEditWordCategory(categoryText) {
  const category = normalizeCategory(categoryText);

  if (!category) return;

  let currentCategories = getEditCategoryValues();

  if (currentCategories.includes(category)) {
    currentCategories = currentCategories.filter(
      item => item !== category
    );
  } else {
    currentCategories.push(category);
  }

  currentCategories = [...new Set(currentCategories)]
    .sort((left, right) =>
      left.localeCompare(right)
    );

  editWordCategory.value =
    currentCategories.join(', ');

  refreshEditWordCategoryPanel();
  openFieldPanel(editWordCategoryPanel);
  editWordCategory.focus();
}

function refreshNewWordTagsPanel() {
  if (!newWordTagsPanel) return;
  const currentTags = new Set(selectedTags);
  const items = getSuggestionItems(getTags(), newWordTagsInput?.value || '');
  if (!items.length) {
    newWordTagsPanel.innerHTML = '<div class="field-dropdown-empty">Chưa có tag nào.</div>';
    return;
  }
  newWordTagsPanel.innerHTML = items
    .map(tag => `
      <button type="button" class="field-dropdown-option${currentTags.has(tag) ? ' active' : ''}" data-value="${tag}">
        ${tag}
      </button>
    `)
    .join('');
  newWordTagsPanel.querySelectorAll('.field-dropdown-option').forEach(button => {
    button.addEventListener('click', () => {
      const tag = button.dataset.value;
      if (selectedTags.includes(tag)) {
        removeTag(tag);
      } else {
        addTag(tag);
      }
      refreshNewWordTagsPanel();
    });
  });
}

function refreshEditWordTagsPanel() {
  if (!editWordTagsPanel) return;

  const currentTags = new Set(editSelectedTags);

  const items = getSuggestionItems(
    getTags(),
    editWordTagsInput?.value || ''
  );

  if (items.length === 0) {
    editWordTagsPanel.innerHTML = `
      <div class="field-dropdown-empty">
        Không tìm thấy tag phù hợp.
      </div>
    `;
    return;
  }

  editWordTagsPanel.innerHTML = items
    .map(tag => `
      <button
        type="button"
        class="field-dropdown-option${
          currentTags.has(tag) ? ' active' : ''
        }"
        data-value="${escapeHtml(tag)}"
      >
        ${escapeHtml(tag)}
      </button>
    `)
    .join('');

  editWordTagsPanel
    .querySelectorAll('.field-dropdown-option')
    .forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.dataset.value || '';

        if (editSelectedTags.includes(tag)) {
          removeEditTag(tag);
        } else {
          addEditTag(tag);
        }

        refreshEditWordTagsPanel();
        openFieldPanel(editWordTagsPanel);
      });
    });
}

function refreshNewWordExamplesPanel() {
  if (!newWordExamplesPanel) return;
  const currentExamples = new Set(selectedExamples.map(example => normalizeText(example)));
  const items = getSuggestionItems(getExamples(), newWordExamplesInput?.value || '');
  if (!items.length) {
    newWordExamplesPanel.innerHTML = '<div class="field-dropdown-empty">Chưa có ví dụ nào.</div>';
    return;
  }
  newWordExamplesPanel.innerHTML = items
    .map(example => `
      <button type="button" class="field-dropdown-option${currentExamples.has(normalizeText(example)) ? ' active' : ''}" data-value="${escapeHtml(example)}">
        ${escapeHtml(example)}
      </button>
    `)
    .join('');
  newWordExamplesPanel.querySelectorAll('.field-dropdown-option').forEach(button => {
    button.addEventListener('click', () => {
      const example = button.dataset.value;
      if (selectedExamples.includes(example)) {
        removeExample(example);
      } else {
        addExample(example);
      }
      refreshNewWordExamplesPanel();
    });
  });
}

function focusNewWordField(input, panel, refreshPanel) {
  if (!input) return;
  input.focus();
  if (typeof refreshPanel === 'function') {
    refreshPanel();
  }
  openFieldPanel(panel);
}

function normalizeTopic(topic) {
  if (!topic) return 'Tổng hợp';
  return topic
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem('darkMode', isDarkMode);
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}
/* ========================================
   ĐIỂM DANH VÀ ĐẾM SỐ NGÀY HỌC
   ======================================== */

/*
  Tạo chuỗi ngày theo giờ địa phương, dạng YYYY-MM-DD.

  Không dùng toISOString() vì toISOString() sử dụng giờ UTC,
  có thể làm ngày bị lệch tại Việt Nam vào một số khung giờ.
*/
function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/*
  Đọc dữ liệu điểm danh từ localStorage.

  Cấu trúc dữ liệu:
  {
    dates: ["2026-08-01", "2026-08-02"]
  }
*/
function loadStudyAttendance() {
  const saved =
    localStorage.getItem(studyAttendanceKey);

  if (!saved) {
    return {
      dates: []
    };
  }

  try {
    const parsed = JSON.parse(saved);

    const dates = Array.isArray(parsed?.dates)
      ? parsed.dates
          .map(date => String(date).trim())
          .filter(Boolean)
      : [];

    /*
      Set giúp loại bỏ ngày bị trùng nếu dữ liệu cũ
      vô tình chứa cùng một ngày nhiều lần.
    */
    return {
      dates: [...new Set(dates)]
    };
  } catch (error) {
    console.error(
      'Không thể đọc dữ liệu điểm danh:',
      error
    );

    return {
      dates: []
    };
  }
}

function saveStudyAttendance(attendance) {
  /*
    Chuẩn hóa dữ liệu trước khi lưu.
  */
  const normalizedAttendance = {
    dates: [
      ...new Set(
        Array.isArray(attendance?.dates)
          ? attendance.dates
              .map(date =>
                String(date).trim()
              )
              .filter(Boolean)
          : []
      )
    ].sort()
  };

  /*
    Lưu trong trình duyệt.
  */
  localStorage.setItem(
    studyAttendanceKey,
    JSON.stringify(
      normalizedAttendance
    )
  );

  /*
    Đồng bộ lên Firebase.
  */
  set(
    studyAttendanceRef,
    normalizedAttendance
  )
    .then(() => {
      console.log(
        "Đã đồng bộ điểm danh."
      );
    })
    .catch(error => {
      console.error(
        "Không thể đồng bộ điểm danh:",
        error
      );
    });
}

/* Kiểm tra hôm nay đã điểm danh hay chưa */
function hasCheckedInToday(attendance) {
  const today = getLocalDateKey();

  return attendance.dates.includes(today);
}

/* Cập nhật số ngày và trạng thái trên giao diện */
function renderStudyAttendance() {
  const attendance = loadStudyAttendance();

  const totalDays = attendance.dates.length;
  const checkedToday =
    hasCheckedInToday(attendance);

  if (studyDaysCount) {
    studyDaysCount.textContent =
      String(totalDays);
  }

  if (studyDaysPanelCount) {
    studyDaysPanelCount.textContent =
      String(totalDays);
  }

  if (studyAttendanceStatus) {
    studyAttendanceStatus.textContent =
      checkedToday
        ? 'Bạn đã điểm danh hôm nay.'
        : 'Hôm nay bạn chưa điểm danh.';

    studyAttendanceStatus.classList.toggle(
      'checked',
      checkedToday
    );
  }

  if (studyAttendanceBtn) {
    studyAttendanceBtn.disabled =
      checkedToday;

    studyAttendanceBtn.textContent =
      checkedToday
        ? '✓ Đã điểm danh hôm nay'
        : 'Điểm danh hôm nay';
  }

  if (studyDaysBtn) {
    studyDaysBtn.classList.toggle(
      'checked',
      checkedToday
    );

    studyDaysBtn.title =
      checkedToday
        ? `Đã điểm danh hôm nay — Tổng ${totalDays} ngày`
        : `Chưa điểm danh hôm nay — Tổng ${totalDays} ngày`;
  }
}

/* Mở hoặc đóng bảng điểm danh */
function setStudyDaysPanelOpen(open) {
  if (
    !studyDaysPanel ||
    !studyDaysBtn
  ) {
    return;
  }

  studyDaysPanel.classList.toggle(
    'hidden',
    !open
  );

  studyDaysBtn.setAttribute(
    'aria-expanded',
    String(open)
  );
}

/* Xử lý khi nhấn nút điểm danh */
function checkInStudyToday() {
  const attendance = loadStudyAttendance();
  const today = getLocalDateKey();

  /*
    Nếu đã điểm danh hôm nay thì không tăng số ngày.
  */
  if (attendance.dates.includes(today)) {
    renderStudyAttendance();

    showNotification(
      'Bạn đã điểm danh hôm nay rồi.'
    );

    return;
  }

  attendance.dates.push(today);

  /*
    Sắp xếp để dữ liệu ngày luôn có thứ tự.
  */
  attendance.dates.sort();

  saveStudyAttendance(attendance);
  renderStudyAttendance();

  showNotification(
    `Điểm danh thành công! Bạn đã học ${attendance.dates.length} ngày.`
  );
}

/* Khởi tạo phần điểm danh khi mở trang */
function initStudyAttendance() {
  renderStudyAttendance();
  setStudyDaysPanelOpen(false);
}
function applyDevice(device) {
  if (device !== 'mobile' && device !== 'desktop') {
    return;
  }

  document.documentElement.setAttribute(
    'data-device',
    device
  );

  localStorage.setItem('deviceType', device);

  if (deviceMobileBtn) {
    deviceMobileBtn.classList.toggle(
      'primary-btn',
      device === 'mobile'
    );

    deviceMobileBtn.classList.toggle(
      'secondary-btn',
      device !== 'mobile'
    );
  }

  if (deviceDesktopBtn) {
    deviceDesktopBtn.classList.toggle(
      'primary-btn',
      device === 'desktop'
    );

    deviceDesktopBtn.classList.toggle(
      'secondary-btn',
      device !== 'desktop'
    );
  }

  if (deviceToggleBtn) {
    deviceToggleBtn.textContent =
      device === 'desktop' ? '💻' : '📱';

    deviceToggleBtn.title =
      device === 'desktop'
        ? 'Giao diện máy tính'
        : 'Giao diện điện thoại';
  }

  populateCategoryOptions();
  renderVocabList();
  renderStats();
}

function showDeviceModal() {
  if (!deviceModal) return;
  deviceModal.classList.remove('hidden');
}

function closeDeviceModalWindow() {
  if (!deviceModal) return;
  deviceModal.classList.add('hidden');
}

function initDevicePreference() {
  const pref = localStorage.getItem('deviceType');
  if (pref) {
    applyDevice(pref);
  } else {
    // show modal to ask
    showDeviceModal();
  }
}

function initDarkMode() {
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

function loadVocab() {
  loadStats();
  loadExampleStats();
  const saved = localStorage.getItem(dataKey);
  if (saved) {
    try {
      const items = JSON.parse(saved);
      vocab = Array.isArray(items) ? [...defaultVocab, ...items] : defaultVocab;
    } catch {
      vocab = [...defaultVocab];
    }
  } else {
    vocab = [...defaultVocab];
  }
  vocab = vocab.map(item => ({
  ...item,

  english:
    String(item.english || '').trim(),

  vietnamese:
    normalizeVietnameseValue(item.vietnamese),

  category:
    normalizeCategorySelection(item.category),

  topic:
    normalizeTopic(item.topic),

  tags:
    normalizeTags(item.tags),

  examples:
    normalizeExamples(item.examples),
}));
}

function saveVocab() {
  const customWords = vocab.filter(
    word => !defaultVocab.some(
      item =>
        item.english === word.english &&
        item.vietnamese === word.vietnamese
    )
  );

  // Vẫn lưu local để dùng offline
  localStorage.setItem(dataKey, JSON.stringify(customWords));

  // Đồng bộ lên Firebase
  set(vocabRef, customWords)
    .then(() => {
      console.log("Đã đồng bộ Firebase");
    })
    .catch(error => {
      console.error("Lỗi đồng bộ:", error);
    });
}

function syncFirebase() {
  /*
    1. Đồng bộ danh sách từ vựng
  */
  onValue(
    vocabRef,
    snapshot => {
      const firebaseWords =
        snapshot.val();

      /*
        Firebase chưa có từ vựng:
        đưa dữ liệu local hiện tại lên Firebase.
      */
      if (
        firebaseWords === null ||
        firebaseWords === undefined
      ) {
        const localCustomWords =
          vocab.filter(
            word =>
              !defaultVocab.some(
                defaultWord =>
                  defaultWord.english ===
                    word.english &&
                  defaultWord.vietnamese ===
                    word.vietnamese
              )
          );

        if (localCustomWords.length > 0) {
          set(
            vocabRef,
            localCustomWords
          ).catch(error => {
            console.error(
              "Không thể đưa từ vựng local lên Firebase:",
              error
            );
          });
        }

        return;
      }

      /*
        Firebase có dữ liệu:
        dùng Firebase làm dữ liệu chính.
      */
      const receivedWords =
        Array.isArray(firebaseWords)
          ? firebaseWords
          : Object.values(firebaseWords);

      vocab = [
        ...defaultVocab,
        ...receivedWords
      ].map(item => ({
        ...item,

        english:
          String(
            item.english || ""
          ).trim(),

        vietnamese:
          normalizeVietnameseValue(
            item.vietnamese
          ),

        category:
          normalizeCategorySelection(
            item.category
          ),

        topic:
          normalizeTopic(item.topic),

        tags:
          normalizeTags(item.tags),

        examples:
          normalizeExamples(
            item.examples
          )
      }));

      /*
        Cập nhật bản local để dùng offline.
      */
      const customWords =
        vocab.filter(
          word =>
            !defaultVocab.some(
              defaultWord =>
                defaultWord.english ===
                  word.english &&
                defaultWord.vietnamese ===
                  word.vietnamese
            )
        );

      localStorage.setItem(
        dataKey,
        JSON.stringify(customWords)
      );

      populateCategoryOptions();
      filterVocab();
      renderVocabList();
      renderStats();
      resetLearning();

      console.log(
        "Đã nhận từ vựng từ Firebase."
      );
    },
    error => {
      console.error(
        "Lỗi đọc từ vựng Firebase:",
        error
      );
    }
  );

  /*
    2. Đồng bộ thống kê từ vựng
  */
  onValue(
    wordStatsRef,
    snapshot => {
      const firebaseValue =
        snapshot.val();

      /*
        Firebase chưa có thống kê:
        đưa thống kê local lên.
      */
      if (
        firebaseValue === null ||
        firebaseValue === undefined
      ) {
        if (
          Object.keys(wordStats).length > 0
        ) {
          set(
            wordStatsRef,
            JSON.stringify(wordStats)
          ).catch(error => {
            console.error(
              "Không thể đưa thống kê local lên Firebase:",
              error
            );
          });
        }

        return;
      }

      try {
        const parsed =
          typeof firebaseValue === "string"
            ? JSON.parse(firebaseValue)
            : firebaseValue;

        wordStats =
          Object.fromEntries(
            Object.entries(
              parsed || {}
            ).map(
              ([wordId, stats]) => [
                wordId,
                ensureReviewFields(
                  stats
                )
              ]
            )
          );

        localStorage.setItem(
          statsKey,
          JSON.stringify(wordStats)
        );

        renderStats();
        renderVocabList();
        filterVocab();

        console.log(
          "Đã nhận thống kê từ Firebase."
        );
      } catch (error) {
        console.error(
          "Dữ liệu thống kê Firebase không hợp lệ:",
          error
        );
      }
    },
    error => {
      console.error(
        "Lỗi đọc thống kê Firebase:",
        error
      );
    }
  );

  /*
    3. Đồng bộ thống kê Example
  */
  onValue(
    exampleStatsRef,
    snapshot => {
      const firebaseValue =
        snapshot.val();

      /*
        Firebase chưa có dữ liệu:
        đưa dữ liệu local hiện tại lên.
      */
      if (
        firebaseValue === null ||
        firebaseValue === undefined
      ) {
        if (
          Object.keys(exampleStats)
            .length > 0
        ) {
          set(
            exampleStatsRef,
            JSON.stringify(
              exampleStats
            )
          ).catch(error => {
            console.error(
              "Không thể đưa thống kê Example local lên Firebase:",
              error
            );
          });
        }

        return;
      }

      try {
        const parsed =
          typeof firebaseValue === "string"
            ? JSON.parse(firebaseValue)
            : firebaseValue;

        exampleStats =
          Object.fromEntries(
            Object.entries(
              parsed || {}
            ).map(
              ([exampleId, stats]) => [
                exampleId,
                ensureExampleStatsFields(
                  stats
                )
              ]
            )
          );

        localStorage.setItem(
          exampleStatsKey,
          JSON.stringify(
            exampleStats
          )
        );

        renderStats();

        console.log(
          "Đã nhận thống kê Example từ Firebase."
        );
      } catch (error) {
        console.error(
          "Dữ liệu Example Firebase không hợp lệ:",
          error
        );
      }
    },
    error => {
      console.error(
        "Lỗi đọc thống kê Example Firebase:",
        error
      );
    }
  );

  /*
    4. Đồng bộ điểm danh
  */
  onValue(
    studyAttendanceRef,
    snapshot => {
      const firebaseAttendance =
        snapshot.val();

      /*
        Firebase chưa có điểm danh:
        đưa dữ liệu local lên Firebase.
      */
      if (
        firebaseAttendance === null ||
        firebaseAttendance === undefined
      ) {
        const localAttendance =
          loadStudyAttendance();

        if (
          localAttendance.dates.length > 0
        ) {
          set(
            studyAttendanceRef,
            localAttendance
          ).catch(error => {
            console.error(
              "Không thể đưa điểm danh local lên Firebase:",
              error
            );
          });
        }

        return;
      }

      const dates =
        Array.isArray(
          firebaseAttendance?.dates
        )
          ? firebaseAttendance.dates
              .map(date =>
                String(date).trim()
              )
              .filter(Boolean)
          : [];

      const normalizedAttendance = {
        dates: [
          ...new Set(dates)
        ].sort()
      };

      /*
        Chỉ cập nhật localStorage.
        Không gọi saveStudyAttendance() tại đây,
        vì hàm đó sẽ ghi ngược lên Firebase và
        tạo vòng lặp ghi dữ liệu không cần thiết.
      */
      localStorage.setItem(
        studyAttendanceKey,
        JSON.stringify(
          normalizedAttendance
        )
      );

      renderStudyAttendance();

      console.log(
        "Đã nhận điểm danh từ Firebase."
      );
    },
    error => {
      console.error(
        "Lỗi đọc điểm danh Firebase:",
        error
      );
    }
  );
}

function exportData() {
  const customWords = vocab.filter(
    word =>
      !defaultVocab.some(
        item =>
          item.english === word.english &&
          item.vietnamese === word.vietnamese
      )
  );

  const exportedWords = customWords.map(item => ({
    english: item.english,

    vietnamese:
      getVietnameseMeaningsForDisplay(item).join(', '),

    pronunciation:
      item.pronunciation || '',

    category:
      getCategoryList(item).join(', '),

    topic:
      item.topic || 'Tổng hợp',

    tags:
      normalizeTags(item.tags).join(', '),

    examples:
      normalizeExamples(item.examples),
  }));

  const payload = {
  version: latestExportVersion,

  defaultVocab: [],

  customVocab: exportedWords,

  /*
    Thống kê từ vựng.
  */
  stats: wordStats,

  /*
    Thống kê câu Example.
  */
  exampleStats: exampleStats,

  /*
    Dữ liệu điểm danh.
  */
  studyAttendance:
    loadStudyAttendance(),

  exportedAt:
    new Date().toISOString()
};

  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    {
      type: 'application/json;charset=utf-8',
    }
  );

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);

  link.download =
    `vocab-export-${
      new Date().toISOString().slice(0, 10)
    }.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(link.href);

  showNotification(
    '✅ Xuất dữ liệu thành công.',
    2500
  );
}

function importData(file) {
  const reader = new FileReader();

  reader.onload = event => {
    try {
      const payload = JSON.parse(event.target.result);

      if (!payload || !Array.isArray(payload.customVocab)) {
        throw new Error(
          "File không đúng định dạng hoặc thiếu customVocab."
        );
      }

      const confirmed = confirm(
        "Các từ mới trong file sẽ được thêm vào danh sách hiện tại.\n\n" +
        "Từ vựng cũ và tiến độ học vẫn được giữ nguyên.\n" +
        "Các từ trùng sẽ được bỏ qua hoặc bổ sung ví dụ, tag.\n\n" +
        "Bạn có muốn tiếp tục không?"
      );

      if (!confirmed) {
        return;
      }

      // Sao lưu dữ liệu hiện tại trước khi nhập.
      localStorage.setItem(
        "openquizVocabBackup",
        JSON.stringify({
          version: latestExportVersion,

          customVocab: vocab.filter(
            word =>
              !defaultVocab.some(
                defaultWord =>
                  defaultWord.english === word.english &&
                  defaultWord.vietnamese === word.vietnamese
              )
          ),

          stats: wordStats,
          exampleStats,
          studyAttendance: loadStudyAttendance(),
          backedUpAt: new Date().toISOString()
        })
      );

      let addedCount = 0;
      let updatedCount = 0;
      let duplicateCount = 0;
      let skippedCount = 0;

      // Chuẩn hóa các từ trong file JSON.
      const importedWords = payload.customVocab
        .map(item => {
          const english = String(item.english || "").trim();

          const vietnamese = normalizeVietnameseValue(
            item.vietnamese
          );

          const categories = normalizeCategorySelection(
            item.category
          );

          if (!english || !vietnamese) {
            skippedCount += 1;
            return null;
          }

          return {
            english,

            vietnamese,

            pronunciation: String(
              item.pronunciation || ""
            ).trim(),

            category:
              categories.length > 0
                ? categories
                : ["Tự Tạo"],

            topic: normalizeTopic(item.topic),

            tags: normalizeTags(item.tags),

            examples: normalizeExamples(item.examples)
          };
        })
        .filter(Boolean);

      // Tạo mã nhận diện để kiểm tra từ trùng.
      const createWordKey = item => {
  return [
    normalizeText(item.english),

    getCategoryList(item)
      .map(category => normalizeText(category))
      .sort()
      .join(","),

    normalizeText(item.topic)
  ].join("|");
};

      // Giữ nguyên toàn bộ từ đang có.
      const mergedWords = new Map();

      vocab.forEach(item => {
        mergedWords.set(
          createWordKey(item),
          item
        );
      });

      // Chỉ thêm từ mới hoặc bổ sung thông tin còn thiếu.
      importedWords.forEach(item => {
        const key = createWordKey(item);

        if (!mergedWords.has(key)) {
          mergedWords.set(key, item);
          addedCount += 1;
          return;
        }

        const existingWord = mergedWords.get(key);

        const previousMeanings =
  normalizeVietnameseValue(
    existingWord.vietnamese
  );

const importedMeanings =
  normalizeVietnameseValue(
    item.vietnamese
  );

const previousMeaningList =
  String(previousMeanings)
    .split('|')
    .map(item => item.trim())
    .filter(Boolean);

const importedMeaningList =
  String(importedMeanings)
    .split('|')
    .map(item => item.trim())
    .filter(Boolean);

const mergedMeanings = [
  ...new Map(
    [
      ...previousMeaningList,
      ...importedMeaningList
    ].map(meaning => [
      normalizeText(meaning),
      meaning
    ])
  ).values()
];

const previousTags = normalizeTags(
  existingWord.tags
);

const previousExamples = normalizeExamples(
  existingWord.examples
);

const mergedTags = normalizeTags([
  ...previousTags,
  ...item.tags
]);

const mergedExamples = normalizeExamples([
  ...previousExamples,
  ...item.examples
]);

let wasUpdated = false;

if (
  mergedMeanings.length >
  previousMeaningList.length
) {
  existingWord.vietnamese =
    mergedMeanings.join(' | ');

  wasUpdated = true;
}

        if (mergedTags.length > previousTags.length) {
          existingWord.tags = mergedTags;
          wasUpdated = true;
        }

        if (
          mergedExamples.length >
          previousExamples.length
        ) {
          existingWord.examples = mergedExamples;
          wasUpdated = true;
        }

        if (
          !existingWord.pronunciation &&
          item.pronunciation
        ) {
          existingWord.pronunciation =
            item.pronunciation;

          wasUpdated = true;
        }

        if (wasUpdated) {
          updatedCount += 1;
        } else {
          duplicateCount += 1;
        }
      });

      // Danh sách sau khi nhập gồm từ cũ và từ mới.
      vocab = [...mergedWords.values()];

      // Giữ tiến độ học hiện tại.
      // Chỉ thêm thống kê chưa tồn tại nếu file có cung cấp.
      if (
        payload.stats &&
        typeof payload.stats === "object" &&
        !Array.isArray(payload.stats)
      ) {
        Object.entries(payload.stats).forEach(
          ([wordId, stats]) => {
            if (
              !Object.prototype.hasOwnProperty.call(
                wordStats,
                wordId
              )
            ) {
              wordStats[wordId] =
                ensureReviewFields(stats);
            }
          }
        );
      }

      // Giữ thống kê câu ví dụ hiện tại.
      if (
        payload.exampleStats &&
        typeof payload.exampleStats === "object" &&
        !Array.isArray(payload.exampleStats)
      ) {
        Object.entries(payload.exampleStats).forEach(
          ([exampleId, stats]) => {
            if (
              !Object.prototype.hasOwnProperty.call(
                exampleStats,
                exampleId
              )
            ) {
              exampleStats[exampleId] =
                ensureExampleStatsFields(stats);
            }
          }
        );
      }

      // Gộp điểm danh nếu file có dữ liệu điểm danh.
      if (
        payload.studyAttendance &&
        typeof payload.studyAttendance === "object" &&
        Array.isArray(payload.studyAttendance.dates)
      ) {
        const currentDates =
          loadStudyAttendance().dates;

        const importedDates =
          payload.studyAttendance.dates
            .map(date => String(date).trim())
            .filter(Boolean);

        saveStudyAttendance({
          dates: [
            ...new Set([
              ...currentDates,
              ...importedDates
            ])
          ]
        });
      }

      saveVocab();
      saveStats();
      saveExampleStats();

      // Làm mới giao diện.
      selectedCategories = [];
      setSelectedCategories([]);
      setSelectedTags([]);

      populateCategoryOptions();
      filterVocab();
      renderVocabList();
      resetLearning();
      renderStats();
      renderStudyAttendance();

      showNotification(
        `✅ Thêm ${addedCount} từ mới, ` +
        `cập nhật ${updatedCount} từ, ` +
        `bỏ qua ${duplicateCount} từ trùng và ` +
        `${skippedCount} mục không hợp lệ.`,
        4500
      );
    } catch (error) {
      alert(
        "Không thể nhập dữ liệu: " +
        error.message
      );
    }
  };

  reader.onerror = () => {
    alert(
      "Không thể đọc file dữ liệu."
    );
  };

  reader.readAsText(file);
}


function getCategories() {
  const categories = new Set(vocab.flatMap(item => getCategoryList(item)));
  return ['Tất cả', ...categories];
}

function getTopics() {
  const topics = new Set(vocab.map(item => item.topic || 'Tổng hợp'));
  return ['Tất cả', ...topics];
}

function updateCategorySelectSummary() {
  if (!categorySelectSummary) return;
  if (selectedCategories.length === 0) {
    categorySelectSummary.textContent = 'Tất cả';
    return;
  }
  if (selectedCategories.length <= 2) {
    categorySelectSummary.textContent = selectedCategories.join(', ');
    return;
  }
  categorySelectSummary.textContent = `${selectedCategories[0]}, ${selectedCategories[1]} +${selectedCategories.length - 2}`;
}

function setCategoryPanelOpen(isOpen) {
  if (!categorySelectPanel || !categorySelectToggle) return;
  categorySelectPanel.classList.toggle('hidden', !isOpen);
  categorySelectToggle.setAttribute('aria-expanded', String(isOpen));
}

function getSelectedCategories() {
  return [...selectedCategories];
}

function setSelectedCategories(categories = []) {
  selectedCategories = [...new Set(categories.filter(Boolean))];
  if (categorySelectPanel) {
    const active = new Set(selectedCategories);
    categorySelectPanel.querySelectorAll('.tag-option').forEach(button => {
      const isActive = active.has(button.dataset.category);
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }
  updateCategorySelectSummary();
}

function getTags() {
  const tags = new Set(vocab.flatMap(item => item.tags || []));
  return [...tags];
}


function renderLessonTagList() {

  if (!lessonTagList) return;

  // Lấy toàn bộ tag từ dữ liệu từ vựng
  const allTags = getTags();

  // Nếu tag đang chọn đã bị xóa khỏi dữ liệu
  // thì bỏ lựa chọn cũ
  if (
    selectedLessonTag &&
    !allTags.includes(selectedLessonTag)
  ) {
    selectedLessonTag = '';
  }

  // Tìm kiếm tag
  const query = normalizeText(
    lessonTagSearch?.value
  );

  const visibleTags = allTags.filter(tag =>
    normalizeText(tag).includes(query)
  );

  // Không có tag phù hợp
  if (visibleTags.length === 0) {

    lessonTagList.innerHTML = `
      <div class="lesson-empty">
        Không tìm thấy thẻ tag phù hợp.
      </div>
    `;

  } else {

    lessonTagList.innerHTML = visibleTags
      .map(tag => {

        // Đếm số từ thuộc tag
        const count = vocab.filter(item =>
          normalizeTags(item.tags).includes(tag)
        ).length;

        const active =
          tag === selectedLessonTag;

        return `
          <button
            type="button"
            class="lesson-tag-option ${active ? 'active' : ''}"
            data-lesson-tag="${escapeHtml(tag)}"
            aria-pressed="${active}"
          >
            <span>${escapeHtml(tag)}</span>
            <small>${count} từ</small>
          </button>
        `;

      })
      .join('');

    // Xử lý khi nhấn vào tag
    lessonTagList
      .querySelectorAll('.lesson-tag-option')
      .forEach(button => {

        button.addEventListener('click', () => {

          const tag =
            button.dataset.lessonTag || '';

          // Nhấn lại tag đang chọn thì bỏ chọn
          selectedLessonTag =
            selectedLessonTag === tag ? '' : tag;

          renderLessonTagList();

        });

      });

  }

  // Cập nhật khu vực từ vựng
  renderLessonWords();

}

function renderLessonWords() {

  if (!lessonWordList) return;

  // Chỉ lấy những từ thuộc tag đang chọn
  const items = selectedLessonTag
    ? vocab.filter(item =>
        normalizeTags(item.tags).includes(
          selectedLessonTag
        )
      )
    : [];

  // Cập nhật số lượng
  if (lessonWordCount) {
    lessonWordCount.textContent =
      `${items.length} từ`;
  }

  // Chưa chọn tag
  if (!selectedLessonTag) {

    lessonWordList.innerHTML = `
      <div class="lesson-empty">
        Chọn một thẻ tag bên phải để xem các từ vựng.
      </div>
    `;

    return;
  }

  // Tag không có từ
  if (items.length === 0) {

    lessonWordList.innerHTML = `
      <div class="lesson-empty">
        Chưa có từ vựng thuộc tag này.
      </div>
    `;

    return;
  }

  // Hiển thị từng từ
  lessonWordList.innerHTML = items
    .map((item, index) => {

      const pronunciation = item.pronunciation
        ? escapeHtml(item.pronunciation)
        : 'Chưa có phiên âm';

      const examples =
        normalizeExamples(item.examples);

      const tags =
        normalizeTags(item.tags);

      return `

        <article class="lesson-word-card">

          <!-- Từ tiếng Anh và phát âm -->
          <div class="lesson-word-card-top">

            <div>

              <h3 class="lesson-word-title">
                ${escapeHtml(item.english)}
              </h3>

              <div class="lesson-word-pronunciation">
                ${pronunciation}
              </div>

            </div>

            <button
              type="button"
              class="lesson-speak-btn"
              data-lesson-word-index="${index}"
              aria-label="Nghe phát âm"
            >
              🔊
            </button>

          </div>

          <!-- Loại từ -->
          <div class="lesson-word-category">
            Loại từ: ${escapeHtml(
              getCategoryDisplay(item)
            )}
          </div>

          <!-- Nghĩa tiếng Việt -->
          <div class="lesson-word-meaning">
            <strong>Nghĩa:</strong>
            ${escapeHtml(item.vietnamese || 'Chưa có nghĩa')}
          </div>

          <!-- Ví dụ -->
          ${
            examples.length > 0
              ? `
                <div class="lesson-word-examples">

                  <strong>Ví dụ:</strong>

                  ${examples.map(example => `
                    <div class="lesson-word-example">
                      • ${escapeHtml(example)}
                    </div>
                  `).join('')}

                </div>
              `
              : ''
          }

          <!-- Các tag của từ -->
          <div class="lesson-word-tags">

            ${tags.map(tag => `
              <span class="lesson-word-tag">
                ${escapeHtml(tag)}
              </span>
            `).join('')}

          </div>

        </article>

      `;

    })
    .join('');


  // Xử lý nút nghe phát âm
  lessonWordList
    .querySelectorAll('[data-lesson-word-index]')
    .forEach(button => {

      button.addEventListener('click', event => {

        const index = Number(
          event.currentTarget.dataset.lessonWordIndex
        );

        const target = items[index];

        if (!target) return;

        playListenWord(target.english);

      });

    });

}


function updateTagSelectSummary() {
  if (!tagSelectSummary) return;
  const selectedTags = getSelectedTags();
  if (selectedTags.length === 0) {
    tagSelectSummary.textContent = 'Tất cả';
    return;
  }
  if (selectedTags.length <= 2) {
    tagSelectSummary.textContent = selectedTags.join(', ');
    return;
  }
  tagSelectSummary.textContent = `${selectedTags[0]}, ${selectedTags[1]} +${selectedTags.length - 2}`;
}

function setTagPanelOpen(isOpen) {
  if (!tagSelect || !tagSelectToggle) return;
  tagSelect.classList.toggle('hidden', !isOpen);
  tagSelectToggle.setAttribute('aria-expanded', String(isOpen));
}

function getSelectedTags() {
  if (!tagSelect) return [];
  return Array.from(tagSelect.querySelectorAll('.tag-option.active'))
    .map(option => option.dataset.tag)
    .filter(Boolean);
}

function setSelectedTags(tags = []) {
  if (!tagSelect) return;
  const normalized = new Set(tags.filter(Boolean));
  tagSelect.querySelectorAll('.tag-option').forEach(button => {
    const isActive = normalized.has(button.dataset.tag);
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  updateTagSelectSummary();
}

function getReviewStatus(item) {
  const stats =
    ensureReviewFields(
      wordStats[makeWordId(item)] || {}
    );

  if (isStatsDue(stats)) {
    return 'due';
  }

  if (
    stats.correct === 0 &&
    stats.wrong === 0
  ) {
    return 'new';
  }

  if (
    stats.wrong > 0 &&
    !stats.mastered &&
    stats.correctStreak < 10
  ) {
    return 'incorrect';
  }

  if (stats.starred) {
    return 'starred';
  }

  return 'reviewed';
}

function calculateNextDue(item, correct) {
  updateWordStats(item, correct);
}

/*
  Đếm số chữ của từ tiếng Anh.

  Khoảng trắng, dấu gạch nối và dấu câu
  không được tính là chữ.
*/
function getEnglishLetterCount(item) {
  return String(item?.english || '')
    .replace(/[^a-zA-Z]/g, '')
    .length;
}
/*
  Khoảng cách ôn theo chuỗi đúng liên tiếp.

  0: vừa sai hoặc chưa học
  1: ôn sau 1 ngày
  2: ôn sau 2 ngày
  ...
  10: ôn sau 90 ngày
*/
const reviewIntervalByStreak = [
  0,
  1,
  2,
  4,
  7,
  12,
  20,
  30,
  45,
  60,
  90
];

/*
  Trọng số giảm dần khi người dùng
  trả lời đúng liên tiếp.
*/
const reviewWeightByStreak = [
  75, // 0: từ mới
  55, // 1/10
  45, // 2/10
  38, // 3/10
  32, // 4/10
  26, // 5/10
  21, // 6/10
  16, // 7/10
  12, // 8/10
  8,  // 9/10
  3   // 10/10
];

/*
  Chuẩn hóa chuỗi đúng về phạm vi 0–10.
*/
function clampReviewStreak(value) {
  return Math.min(
    10,
    Math.max(
      0,
      Math.floor(Number(value) || 0)
    )
  );
}

/*
  Tạo ngày đến hạn mới theo số ngày truyền vào.
*/
function createNextDueDate(intervalDays) {
  const dueDate = new Date();

  dueDate.setDate(
    dueDate.getDate() +
    Math.max(0, Number(intervalDays) || 0)
  );

  return dueDate.toISOString();
}

/*
  Kiểm tra một mục đã đến hạn hay chưa.
*/
function isStatsDue(stats) {
  if (!stats?.due) return false;

  const dueTime =
    new Date(stats.due).getTime();

  return (
    Number.isFinite(dueTime) &&
    dueTime <= Date.now()
  );
}

/*
  Tính điểm cộng do quá hạn.

  Dùng tỷ lệ:
  số ngày quá hạn / khoảng cách ôn.

  Nhờ vậy:
  quá hạn 2 ngày trên lịch 2 ngày
  nghiêm trọng hơn quá hạn 2 ngày
  trên lịch 60 ngày.
*/
function getOverdueBonus(stats) {
  if (!isStatsDue(stats)) {
    return 0;
  }

  const dueTime =
    new Date(stats.due).getTime();

  const overdueDays =
    Math.max(
      0,
      (Date.now() - dueTime) /
        86400000
    );

  const intervalDays =
    Math.max(
      1,
      Number(stats.intervalDays) || 1
    );

  const overdueRatio =
    overdueDays / intervalDays;

  return Math.min(
    60,
    overdueRatio * 40
  );
}
/*
  Xác định nhóm ưu tiên của một từ.

  Số càng nhỏ thì nhóm càng quan trọng:
  1. Từ sai
  2. Từ mới
  3. Từ sao
  4. Từ dài
  5. Từ đúng liên tiếp đủ 10 lần
  6. Từ bình thường
*/
function getWordPriorityGroup(item) {
  const stats =
    ensureReviewFields(
      wordStats[makeWordId(item)] || {}
    );

  const isNew =
    stats.correct === 0 &&
    stats.wrong === 0;

  /*
    Nhóm 1: đang phục hồi sau khi sai.
  */
  if (
    stats.wrong > 0 &&
    !stats.mastered &&
    stats.correctStreak < 10
  ) {
    return 1;
  }

  /*
    Nhóm 2: đã đến hạn.
  */
  if (isStatsDue(stats)) {
    return 2;
  }

  /*
    Nhóm 3: chưa từng học.
  */
  if (isNew) {
    return 3;
  }

  /*
    Nhóm 4: đang học 1–9.
  */
  if (!stats.mastered) {
    return 4;
  }

  /*
    Nhóm 5: đã đạt 10/10.
  */
  return 5;
}

/*
  Tính trọng số bên trong từng nhóm.

  Nhóm ưu tiên quyết định thứ tự chính.
  Trọng số quyết định từ nào trong cùng nhóm
  có khả năng được chọn nhiều hơn.
*/
function getWordWeight(item) {
  const stats =
    ensureReviewFields(
      wordStats[makeWordId(item)] || {}
    );

  const streak =
    clampReviewStreak(
      stats.correctStreak
    );

  const isNew =
    stats.correct === 0 &&
    stats.wrong === 0;

  /*
    1. Từ đang phục hồi sau khi sai.

    Trọng số:
    - Tăng theo số lần quên lại.
    - Giảm dần khi đang trả lời đúng trở lại.
    - Có giới hạn để không chiếm toàn bộ Quiz.
  */
  if (
    stats.wrong > 0 &&
    !stats.mastered &&
    streak < 10
  ) {
    const mistakeLevel =
      Math.max(
        1,
        Number(stats.lapses) ||
          Number(stats.wrong) ||
          1
      );

    let weight =
      Math.min(
        180,
        100 + mistakeLevel * 15
      );

    /*
      Khi đã đúng lại một số lần,
      mức ưu tiên giảm dần nhưng vẫn cao.
    */
    weight -= streak * 6;

    /*
      Từ sao được cộng thêm nhẹ.
    */
    if (stats.starred) {
      weight += 15;
    }

    return Math.max(
      70,
      weight
    );
  }

  /*
    2. Từ hoàn toàn mới.
  */
  if (isNew) {
    return stats.starred
      ? 90
      : 75;
  }

  /*
    3. Trọng số cơ bản giảm theo
    số lần đúng liên tiếp.
  */
  let weight =
    reviewWeightByStreak[streak];

  /*
    4. Đã đến hạn thì tăng ưu tiên.
  */
  weight += getOverdueBonus(stats);

  /*
    5. Đánh sao chỉ là điểm cộng,
    không ghi đè trạng thái học.
  */
  if (stats.starred) {
    weight += 15;
  }

  /*
    6. Từ dài chỉ được cộng nhẹ.
    Không mặc định coi mọi từ dài là rất khó.
  */
  const letterCount =
    getEnglishLetterCount(item);

  if (letterCount >= 8) {
    weight += Math.min(
      8,
      Math.floor(
        (letterCount - 7) / 2
      )
    );
  }

  if (
  stats.due &&
  !isStatsDue(stats)
) {
  weight *= 0.25;
}

return Math.max(
  1,
  weight
);
}

/*
  Chọn một từ ngẫu nhiên theo trọng số.
*/
function weightedRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const weights = items.map(item =>
    Math.max(0.01, getWordWeight(item))
  );

  const totalWeight = weights.reduce(
    (sum, weight) => sum + weight,
    0
  );

  let randomValue =
    Math.random() * totalWeight;

  for (
    let index = 0;
    index < items.length;
    index += 1
  ) {
    randomValue -= weights[index];

    if (randomValue <= 0) {
      return items[index];
    }
  }

  return items[items.length - 1];
}

/*
  Chọn nhiều từ theo trọng số nhưng
  không lặp lại một từ trong cùng lượt Quiz.
*/
function weightedRandomItems(
  items,
  requestedCount
) {
  const pool = Array.isArray(items)
    ? [...items]
    : [];

  const result = [];

  const count = Math.min(
    Math.max(
      0,
      Math.floor(Number(requestedCount) || 0)
    ),
    pool.length
  );

  while (
    pool.length > 0 &&
    result.length < count
  ) {
    const selectedItem =
      weightedRandomItem(pool);

    if (!selectedItem) {
      break;
    }

    result.push(selectedItem);

    const selectedIndex =
      pool.indexOf(selectedItem);

    if (selectedIndex >= 0) {
      pool.splice(selectedIndex, 1);
    }
  }

  return result;
}
/*
  Lấy một số mục từ một nhóm,
  không để trùng với những mục đã chọn.
*/
function takeWeightedWordItems(
  group,
  count,
  selectedSet
) {
  const available =
    group.filter(
      item => !selectedSet.has(item)
    );

  const selected =
    weightedRandomItems(
      available,
      count
    );

  selected.forEach(
    item => selectedSet.add(item)
  );

  return selected;
}

/*
  Chọn câu theo quota:

  40%: sai hoặc quá hạn
  30%: từ mới
  20%: đang học 1–9
  10%: đã thuộc

  Nếu nhóm nào thiếu, số chỗ trống
  được lấy từ toàn bộ phần còn lại.
*/
function selectWordItemsWithQuota(
  items,
  requestedCount
) {
  const source =
    Array.isArray(items)
      ? [...items]
      : [];

 const count =
  Math.max(
    0,
    Math.floor(
      Number(requestedCount) || 0
    )
  );
  if (count === 0) {
    return [];
  }

  const urgent = [];
  const newItems = [];
  const learning = [];
  const mastered = [];

  source.forEach(item => {
    const stats =
      ensureReviewFields(
        wordStats[makeWordId(item)] || {}
      );

    const isNew =
      stats.correct === 0 &&
      stats.wrong === 0;

    const isRecovering =
      stats.wrong > 0 &&
      !stats.mastered &&
      stats.correctStreak < 10;

    if (
      isRecovering ||
      isStatsDue(stats)
    ) {
      urgent.push(item);
      return;
    }

    if (isNew) {
      newItems.push(item);
      return;
    }

    if (stats.mastered) {
      mastered.push(item);
      return;
    }

    learning.push(item);
  });

  let urgentCount = 0;
let newCount = 0;
let learningCount = 0;
let masteredCount = 0;

if (count === 1) {
  urgentCount = 1;
} else if (count === 2) {
  urgentCount = 1;
  newCount = 1;
} else if (count === 3) {
  urgentCount = 1;
  newCount = 1;
  learningCount = 1;
} else {
  urgentCount =
    Math.max(
      1,
      Math.round(count * 0.4)
    );

  newCount =
    Math.max(
      1,
      Math.round(count * 0.3)
    );

  learningCount =
    Math.max(
      1,
      Math.round(count * 0.2)
    );

  while (
    urgentCount +
      newCount +
      learningCount >
    count
  ) {
    if (learningCount > 1) {
      learningCount -= 1;
    } else if (newCount > 1) {
      newCount -= 1;
    } else {
      urgentCount -= 1;
    }
  }

  masteredCount =
    count -
    urgentCount -
    newCount -
    learningCount;
}

  const selectedSet =
    new Set();

  const result = [
    ...takeWeightedWordItems(
      urgent,
      urgentCount,
      selectedSet
    ),

    ...takeWeightedWordItems(
      newItems,
      newCount,
      selectedSet
    ),

    ...takeWeightedWordItems(
      learning,
      learningCount,
      selectedSet
    ),

    ...takeWeightedWordItems(
      mastered,
      masteredCount,
      selectedSet
    )
  ];

  /*
    Nhóm thiếu dữ liệu:
    lấy phần còn thiếu từ mọi mục còn lại.
  */
  if (result.length < count) {
    const remaining =
      source.filter(
        item => !selectedSet.has(item)
      );

    result.push(
      ...weightedRandomItems(
        remaining,
        count - result.length
      )
    );
  }


  /*
  Nếu số câu yêu cầu lớn hơn số từ hiện có,
  cho phép lặp lại từ để đủ số câu.
*/
while (
  result.length < count &&
  source.length > 0
) {
  const randomItem =
    source[
      Math.floor(
        Math.random() * source.length
      )
    ];

  result.push(randomItem);
}

  /*
    Xáo trộn để nhóm sai không phải lúc nào
    cũng nằm ở đầu Quiz.
  */
  return shuffleArray(result);
}

function shuffleArray(items) {
  const result = [...items];

  for (
    let index = result.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (index + 1)
      );

    [
      result[index],
      result[randomIndex]
    ] = [
      result[randomIndex],
      result[index]
    ];
  }

  return result;
}
/*
  Lấy nhóm ưu tiên riêng của một câu Example.

  1. Example đã làm sai
  2. Example chưa từng xuất hiện
  3. Example đã làm đúng
*/
function getExamplePriorityGroup(item) {
  const exampleText =
    String(item?.quizExample || '').trim();

  const exampleId =
    makeExampleId(exampleText);

  const stats =
    ensureExampleStatsFields(
      exampleStats[exampleId] || {}
    );

  const isNew =
    stats.appeared === 0;

  if (
    stats.wrong > 0 &&
    !stats.mastered &&
    stats.correctStreak < 10
  ) {
    return 1;
  }

  if (isStatsDue(stats)) {
    return 2;
  }

  if (isNew) {
    return 3;
  }

  if (!stats.mastered) {
    return 4;
  }

  return 5;
}

/*
  Trọng số riêng cho Example.

  Example sai nhiều:
  100 + số lần sai × 20

  Example chưa xuất hiện:
  75

  Example đã đúng:
  10 + số lần đúng
*/
function getExampleWeight(item) {
  const exampleText =
    String(item?.quizExample || '').trim();

  const exampleId =
    makeExampleId(exampleText);

  const stats =
    ensureExampleStatsFields(
      exampleStats[exampleId] || {}
    );

  const streak =
    clampReviewStreak(
      stats.correctStreak
    );

  /*
    Example đang phục hồi sau khi sai.
  */
  if (
    stats.wrong > 0 &&
    !stats.mastered &&
    streak < 10
  ) {
    const mistakeLevel =
      Math.max(
        1,
        Number(stats.lapses) ||
          Number(stats.wrong) ||
          1
      );

    const weight =
      Math.min(
        180,
        100 + mistakeLevel * 15
      ) - streak * 6;

    return Math.max(
      70,
      weight
    );
  }

  /*
    Example chưa từng xuất hiện.
  */
  if (stats.appeared === 0) {
    return 75;
  }

  /*
    Trọng số giảm theo đúng liên tiếp,
    không tăng theo tổng số lần đúng.
  */
  let weight =
    reviewWeightByStreak[streak];

  weight += getOverdueBonus(stats);

if (
  stats.due &&
  !isStatsDue(stats)
) {
  weight *= 0.25;
}

return Math.max(
  1,
  weight
);
}

function weightedRandomExampleItem(items) {
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null;
  }

  const weights = items.map(item =>
    Math.max(
      0.01,
      getExampleWeight(item)
    )
  );

  const totalWeight = weights.reduce(
    (total, weight) =>
      total + weight,
    0
  );

  let randomValue =
    Math.random() * totalWeight;

  for (
    let index = 0;
    index < items.length;
    index += 1
  ) {
    randomValue -= weights[index];

    if (randomValue <= 0) {
      return items[index];
    }
  }

  return items[items.length - 1];
}

function weightedRandomExampleItems(
  items,
  requestedCount
) {
  const pool = Array.isArray(items)
    ? [...items]
    : [];

  const result = [];

  const count = Math.min(
    Math.max(
      0,
      Math.floor(
        Number(requestedCount) || 0
      )
    ),
    pool.length
  );

  while (
    pool.length > 0 &&
    result.length < count
  ) {
    const selectedItem =
      weightedRandomExampleItem(pool);

    if (!selectedItem) {
      break;
    }

    result.push(selectedItem);

    const selectedIndex =
      pool.indexOf(selectedItem);

    if (selectedIndex >= 0) {
      pool.splice(selectedIndex, 1);
    }
  }

  return result;
}
function takeWeightedExampleItems(
  group,
  count,
  selectedIds
) {
  const available =
    group.filter(item => {
      const exampleId =
        item.exampleId ||
        makeExampleId(
          item.quizExample
        );

      return !selectedIds.has(
        exampleId
      );
    });

  const selected =
    weightedRandomExampleItems(
      available,
      count
    );

  selected.forEach(item => {
    selectedIds.add(
      item.exampleId ||
      makeExampleId(
        item.quizExample
      )
    );
  });

  return selected;
}

function selectExampleItemsWithQuota(
  items,
  requestedCount
) {
  const source =
    Array.isArray(items)
      ? [...items]
      : [];

 const count =
  Math.max(
    0,
    Math.floor(
      Number(requestedCount) || 0
    )
  );

  if (count === 0) {
    return [];
  }

  const urgent = [];
  const newItems = [];
  const learning = [];
  const mastered = [];

  source.forEach(item => {
    const exampleText =
      String(
        item.quizExample || ''
      ).trim();

    const stats =
      ensureExampleStatsFields(
        exampleStats[
          makeExampleId(exampleText)
        ] || {}
      );

    const isRecovering =
      stats.wrong > 0 &&
      !stats.mastered &&
      stats.correctStreak < 10;

    if (
      isRecovering ||
      isStatsDue(stats)
    ) {
      urgent.push(item);
      return;
    }

    if (stats.appeared === 0) {
      newItems.push(item);
      return;
    }

    if (stats.mastered) {
      mastered.push(item);
      return;
    }

    learning.push(item);
  });

  let urgentCount = 0;
let newCount = 0;
let learningCount = 0;
let masteredCount = 0;

if (count === 1) {
  urgentCount = 1;
} else if (count === 2) {
  urgentCount = 1;
  newCount = 1;
} else if (count === 3) {
  urgentCount = 1;
  newCount = 1;
  learningCount = 1;
} else {
  urgentCount =
    Math.max(
      1,
      Math.round(count * 0.4)
    );

  newCount =
    Math.max(
      1,
      Math.round(count * 0.3)
    );

  learningCount =
    Math.max(
      1,
      Math.round(count * 0.2)
    );

  while (
    urgentCount +
      newCount +
      learningCount >
    count
  ) {
    if (learningCount > 1) {
      learningCount -= 1;
    } else if (newCount > 1) {
      newCount -= 1;
    } else {
      urgentCount -= 1;
    }
  }

  masteredCount =
    count -
    urgentCount -
    newCount -
    learningCount;
}

  const selectedIds =
    new Set();

  const result = [
    ...takeWeightedExampleItems(
      urgent,
      urgentCount,
      selectedIds
    ),

    ...takeWeightedExampleItems(
      newItems,
      newCount,
      selectedIds
    ),

    ...takeWeightedExampleItems(
      learning,
      learningCount,
      selectedIds
    ),

    ...takeWeightedExampleItems(
      mastered,
      masteredCount,
      selectedIds
    )
  ];

  if (result.length < count) {
    const remaining =
      source.filter(item => {
        const exampleId =
          item.exampleId ||
          makeExampleId(
            item.quizExample
          );

        return !selectedIds.has(
          exampleId
        );
      });

    result.push(
      ...weightedRandomExampleItems(
        remaining,
        count - result.length
      )
    );
  }
/*
  Nếu số câu yêu cầu lớn hơn số Example hiện có,
  cho phép lặp Example để đủ số câu.
*/
while (
  result.length < count &&
  source.length > 0
) {
  const randomItem =
    source[
      Math.floor(
        Math.random() * source.length
      )
    ];

  result.push(randomItem);
}
  return shuffleArray(result);
}
function updateWordStats(
  item,
  isCorrect
) {
  if (!item) return;

  const id =
    makeWordId(item);

  const current =
    ensureReviewFields(
      wordStats[id] || {}
    );

  if (isCorrect) {
    /*
      Tổng đúng vẫn được giữ để thống kê.
    */
    current.correct += 1;

    /*
      Chuỗi đúng tăng tối đa tới 10.
    */
    current.correctStreak =
      Math.min(
        10,
        clampReviewStreak(
          current.correctStreak
        ) + 1
      );

    /*
      Khoảng cách ôn lấy từ bảng đã định nghĩa.
    */
    current.intervalDays =
      reviewIntervalByStreak[
        current.correctStreak
      ];

    /*
      Đạt 10 lần đúng liên tiếp.
    */
    current.mastered =
      current.correctStreak >= 10;
  } else {
    /*
      Giữ lịch sử tổng số lần sai.
    */
    current.wrong += 1;

    /*
      Số lần quên lại.
    */
    current.lapses =
      (Number(current.lapses) || 0) + 1;

    /*
      Sai thì chuỗi đúng bắt đầu lại.
    */
    current.correctStreak = 0;
    current.mastered = false;

    /*
      Đưa về lịch ôn ngắn.
    */
    current.intervalDays = 1;
  }

  current.due =
    createNextDueDate(
      current.intervalDays
    );

  current.lastReviewed =
    new Date().toISOString();

  wordStats[id] = current;

  saveStats();
  renderStats();
  renderVocabList();
}
function markExampleAppeared(item) {
  const exampleText =
    String(item?.quizExample || '').trim();

  if (!exampleText) return;

  const exampleId =
    makeExampleId(exampleText);

  const current =
    ensureExampleStatsFields(
      exampleStats[exampleId] || {}
    );

  current.appeared += 1;

  exampleStats[exampleId] = current;

  saveExampleStats();
}

function updateExampleStats(
  item,
  isCorrect
) {
  const exampleText =
    String(item?.quizExample || '').trim();

  if (!exampleText) return;

  const exampleId =
    makeExampleId(exampleText);

  const current =
    ensureExampleStatsFields(
      exampleStats[exampleId] || {}
    );

  if (isCorrect) {
    current.correct += 1;

    current.correctStreak =
      Math.min(
        10,
        clampReviewStreak(
          current.correctStreak
        ) + 1
      );

    current.intervalDays =
      reviewIntervalByStreak[
        current.correctStreak
      ];

    current.mastered =
      current.correctStreak >= 10;
  } else {
    current.wrong += 1;

    current.lapses =
      (Number(current.lapses) || 0) + 1;

    current.correctStreak = 0;
    current.mastered = false;
    current.intervalDays = 1;
  }

  current.due =
    createNextDueDate(
      current.intervalDays
    );

  current.lastReviewed =
  new Date().toISOString();

exampleStats[exampleId] =
  current;

saveExampleStats();
renderStats();
  }
function toggleWordStar(item) {
  const id = makeWordId(item);

  const current = ensureReviewFields(
    wordStats[id] || {}
  );

  current.starred = !current.starred;

  wordStats[id] = current;

  saveStats();
  renderVocabList();
  renderStats();
}

function populateCategoryOptions() {
  const categories = getCategories();
  const tags = getTags();
  const previouslySelectedTags = getSelectedTags();
  const previouslySelectedCategories = getSelectedCategories();
  if (categorySelectPanel) {
    const categoryItems = categories.filter(category => category !== 'Tất cả');
    categorySelectPanel.innerHTML = categoryItems.length > 0
      ? categoryItems
        .map(category => `
          <button type="button" class="tag-option" data-category="${category}" aria-pressed="false">
            ${category}
          </button>
        `)
        .join('')
      : '<div class="tag-empty">Chưa có loại từ nào.</div>';

    categorySelectPanel.querySelectorAll('.tag-option').forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        const current = new Set(getSelectedCategories());
        if (current.has(category)) {
          current.delete(category);
        } else {
          current.add(category);
        }
        setSelectedCategories([...current]);
        resetLearning();
        if (!quizPanel.classList.contains('hidden')) startQuiz();
      });
    });

    if (previouslySelectedCategories.length > 0) {
      setSelectedCategories(previouslySelectedCategories);
    } else {
      updateCategorySelectSummary();
    }
  }
  if (tagSelect) {
    tagSelect.innerHTML = tags.length > 0
      ? tags
        .map(tag => `
          <button type="button" class="tag-option" data-tag="${tag}" aria-pressed="false">
            ${tag}
          </button>
        `)
        .join('')
      : '<div class="tag-empty">Chưa có tag nào.</div>';

    if (previouslySelectedTags.length > 0) {
      setSelectedTags(previouslySelectedTags);
    } else {
      updateTagSelectSummary();
    }

    tagSelect.querySelectorAll('.tag-option').forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.dataset.tag;
        const current = new Set(getSelectedTags());
        if (current.has(tag)) {
          current.delete(tag);
        } else {
          current.add(tag);
        }
        setSelectedTags([...current]);
        resetLearning();
        if (!quizPanel.classList.contains('hidden')) startQuiz();
      });
    });
  }
 
    refreshNewWordCategoryPanel();
  refreshNewWordTagsPanel();

  // Cập nhật tag và từ vựng trong Bài học
  renderLessonTagList();
}
function filterVocab() {
  const query =
    normalizeText(searchInput?.value);

  const categories =
    getSelectedCategories();

  const selectedTags =
    getSelectedTags();

  const reviewMode =
    reviewModeSelect?.value || 'all';

  filteredVocab = vocab.filter(item => {
    const stats =
      ensureReviewFields(
        wordStats[makeWordId(item)] || {}
      );

    const matchesSearch =
      !query ||
      matchesQuery(item.english, query) ||
      matchesQuery(item.vietnamese, query) ||
      matchesQuery(
        getCategoryDisplay(item),
        query
      ) ||
      matchesQuery(item.topic, query) ||
      matchesQuery(
        getTagsDisplay(item),
        query
      ) ||
      matchesQuery(
        item.pronunciation,
        query
      );

    if (!matchesSearch) {
      return false;
    }

    if (
      !query &&
      categories.length > 0 &&
      !categories.some(category =>
        itemMatchesCategory(
          item,
          category
        )
      )
    ) {
      return false;
    }

    if (
      !query &&
      selectedTags.length > 0 &&
      !selectedTags.some(tag =>
        (item.tags || []).includes(tag)
      )
    ) {
      return false;
    }

    if (reviewMode === 'due') {
      return isStatsDue(stats);
    }

    if (reviewMode === 'incorrect') {
      return (
        stats.wrong > 0 &&
        !stats.mastered &&
        stats.correctStreak < 10
      );
    }

    if (reviewMode === 'starred') {
      return stats.starred === true;
    }

    if (reviewMode === 'new') {
      return (
        stats.correct === 0 &&
        stats.wrong === 0
      );
    }

    return true;
  });
}

function getFilteredVocabItems() {
  const query = normalizeText(searchInput?.value);
  const categories = getSelectedCategories();
  const selectedTags = getSelectedTags();
  return vocab.filter(item => {
    const matchesSearch =
      !query ||
      matchesQuery(item.english, query) ||
      matchesQuery(item.vietnamese, query) ||
      matchesQuery(getCategoryDisplay(item), query) ||
      matchesQuery(item.topic, query) ||
      matchesQuery(getTagsDisplay(item), query) ||
      matchesQuery(item.pronunciation, query);

    if (!matchesSearch) {
      return false;
    }

    if (!query && categories.length > 0 && !categories.some(category => itemMatchesCategory(item, category))) {
      return false;
    }
    if (!query && selectedTags.length > 0 && !selectedTags.some(tag => (item.tags || []).includes(tag))) {
      return false;
    }
    return true;
  });
}

function getTotalWords() {
  return vocab.length;
}

function getCorrectCount() {
  return Object.values(wordStats).reduce((sum, stats) => sum + (stats.correct || 0), 0);
}

function getWrongCount() {
  return Object.values(wordStats).reduce((sum, stats) => sum + (stats.wrong || 0), 0);
}

/*
  Lấy tất cả từ đã từng làm sai.

  Danh sách này sử dụng cùng dữ liệu wordStats
  với thuật toán trọng số xuất hiện.
*/
function getWrongWordsForStats() {
  return vocab
    .map(item => {
      const stats = ensureReviewFields(
        wordStats[makeWordId(item)] || {}
      );

      return {
  item,

  english:
    String(item.english || '').trim(),

  category:
    getCategoryDisplay(item),

  wrong:
    Number(stats.wrong) || 0,
        correct: Number(stats.correct) || 0,
        correctStreak:
          Number(stats.correctStreak) || 0,
        mastered: Boolean(stats.mastered),

        /*
          Lấy đúng trọng số mà thuật toán chọn câu hỏi
          đang sử dụng.
        */
        weight: getWordWeight(item),

        priorityGroup:
          getWordPriorityGroup(item)
      };
    })

    /*
      Chỉ hiển thị từ đã từng sai.
    */
    .filter(entry =>
  entry.wrong > 0 &&
  entry.correctStreak < 10 &&
  !entry.mastered
)

    /*
      Sắp xếp:
      1. Nhóm ưu tiên cao hơn đứng trước.
      2. Sai nhiều hơn đứng trước.
      3. Trọng số lớn hơn đứng trước.
      4. Đúng liên tiếp ít hơn đứng trước.
    */
    .sort((left, right) => {
      if (
        left.priorityGroup !==
        right.priorityGroup
      ) {
        return (
          left.priorityGroup -
          right.priorityGroup
        );
      }

      if (left.wrong !== right.wrong) {
        return right.wrong - left.wrong;
      }

      if (left.weight !== right.weight) {
        return right.weight - left.weight;
      }

      return (
        left.correctStreak -
        right.correctStreak
      );
    });
}
function getWrongExamplesForStats() {
  const exampleMap = new Map();

  vocab.forEach(item => {
    getQuestionExamples(item)
      .forEach(exampleText => {
        const cleanExample =
          String(
            exampleText || ''
          ).trim();

        if (!cleanExample) return;

        const exampleId =
          makeExampleId(
            cleanExample
          );

        /*
          Nếu cùng một câu Example xuất hiện
          trong nhiều từ thì chỉ hiển thị một lần.
        */
        if (!exampleMap.has(exampleId)) {
          exampleMap.set(
            exampleId,
            cleanExample
          );
        }
      });
  });

  return [...exampleMap.entries()]
    .map(
      ([exampleId, exampleText]) => {
        const stats =
          ensureExampleStatsFields(
            exampleStats[exampleId] || {}
          );

        return {
  exampleId,
  exampleText,

  /*
    Tổng số lần đúng.
  */
  correct:
    stats.correct,

  /*
    Tổng số lần sai hiện tại.
  */
  wrong:
    stats.wrong,

  /*
    Tiến độ đúng liên tiếp tới 10.
  */
  correctStreak:
    stats.correctStreak,

  mastered:
    stats.mastered,

  appeared:
    stats.appeared,

  weight:
    getExampleWeight({
      quizExample: exampleText
    }),

  priorityGroup:
    getExamplePriorityGroup({
      quizExample: exampleText
    })
};
      }
    )
    .filter(entry =>
  entry.wrong > 0 &&
  entry.correctStreak < 10 &&
  !entry.mastered
)
    .sort((left, right) => {
      if (
        left.priorityGroup !==
        right.priorityGroup
      ) {
        return (
          left.priorityGroup -
          right.priorityGroup
        );
      }

      if (
        left.wrong !==
        right.wrong
      ) {
        return (
          right.wrong -
          left.wrong
        );
      }

      return (
  left.correctStreak -
  right.correctStreak
);
    });
}
function getStarredCount() {
  return Object.values(wordStats).filter(stats => stats.starred).length;
}

function getDueWordCount() {
  return Object.values(wordStats).filter(stats => stats.due && new Date(stats.due) <= new Date()).length;
}

function getNewWordCount() {
  return vocab.filter(item => {
    const stats = wordStats[makeWordId(item)] || { correct: 0, wrong: 0 };
    return stats.correct === 0 && stats.wrong === 0;
  }).length;
}
/*
  Xóa trạng thái của tất cả từ đang thuộc nhóm từ sai.

  Chỉ reset những từ hiện còn số lần sai lớn hơn 0.
  Không xóa từ vựng và không xóa trạng thái đánh sao.
*/
function getWrongWordStatsIds() {
  return Object.keys(wordStats)
    .filter(wordId => {
      const stats =
        ensureReviewFields(
          wordStats[wordId] || {}
        );

      return stats.wrong > 0;
    });
}

function getWrongExampleStatsIds() {
  return Object.keys(exampleStats)
    .filter(exampleId => {
      const stats =
        ensureExampleStatsFields(
          exampleStats[exampleId] || {}
        );

      return stats.wrong > 0;
    });
}

/*
  Cập nhật trạng thái nút Đồng ý xóa.
  Chỉ cho nhấn khi đã chọn ít nhất một ô.
*/
function updateResetStatsConfirmButton() {
  const deleteWords =
    resetWordStatsCheckbox?.checked === true &&
    resetWordStatsCheckbox?.disabled !== true;

  const deleteExamples =
    resetExampleStatsCheckbox?.checked === true &&
    resetExampleStatsCheckbox?.disabled !== true;

  const hasSelection =
    deleteWords || deleteExamples;

  if (confirmResetStatsBtn) {
    confirmResetStatsBtn.disabled =
      !hasSelection;
  }

  if (resetStatsWarning) {
    resetStatsWarning.textContent =
      hasSelection
        ? ''
        : 'Hãy chọn ít nhất một loại thống kê.';
  }
}

/*
  Mở modal của website.
  Chưa thực hiện xóa ở bước này.
*/
function resetWrongWordStats() {
  const wrongWordIds =
    getWrongWordStatsIds();

  const wrongExampleIds =
    getWrongExampleStatsIds();

  if (
    wrongWordIds.length === 0 &&
    wrongExampleIds.length === 0
  ) {
    showNotification(
      'Hiện không có thống kê sai nào để xóa.'
    );

    return;
  }

  if (!resetStatsModal) return;

  /*
    Mỗi lần mở modal đều bỏ lựa chọn cũ.
    Điều này giúp tránh vô tình xóa lại
    lựa chọn của lần trước.
  */
  if (resetWordStatsCheckbox) {
    resetWordStatsCheckbox.checked = false;

    resetWordStatsCheckbox.disabled =
      wrongWordIds.length === 0;
  }

  if (resetExampleStatsCheckbox) {
    resetExampleStatsCheckbox.checked = false;

    resetExampleStatsCheckbox.disabled =
      wrongExampleIds.length === 0;
  }

  if (resetWordStatsCount) {
    resetWordStatsCount.textContent =
      wrongWordIds.length > 0
        ? `${wrongWordIds.length} từ đang sai`
        : 'Không có từ vựng sai';
  }

  if (resetExampleStatsCount) {
    resetExampleStatsCount.textContent =
      wrongExampleIds.length > 0
        ? `${wrongExampleIds.length} Example đang sai`
        : 'Không có Example sai';
  }

  updateResetStatsConfirmButton();

  resetStatsModal.classList.remove(
    'hidden'
  );
}

/*
  Đóng modal mà không xóa dữ liệu.
*/
function closeResetStatsModal() {
  if (!resetStatsModal) return;

  resetStatsModal.classList.add(
    'hidden'
  );

  if (resetWordStatsCheckbox) {
    resetWordStatsCheckbox.checked = false;
  }

  if (resetExampleStatsCheckbox) {
    resetExampleStatsCheckbox.checked = false;
  }

  updateResetStatsConfirmButton();
}

/*
  Chỉ chạy khi người dùng nhấn Đồng ý xóa.
*/
function confirmResetSelectedStats() {
  const deleteWordStats =
    resetWordStatsCheckbox?.checked === true &&
    resetWordStatsCheckbox?.disabled !== true;

  const deleteExampleStats =
    resetExampleStatsCheckbox?.checked === true &&
    resetExampleStatsCheckbox?.disabled !== true;

  if (
    !deleteWordStats &&
    !deleteExampleStats
  ) {
    updateResetStatsConfirmButton();
    return;
  }

  const wrongWordIds =
    getWrongWordStatsIds();

  const wrongExampleIds =
    getWrongExampleStatsIds();

  let deletedWordCount = 0;
  let deletedExampleCount = 0;

  /*
    Chỉ xóa thống kê từ vựng
    nếu ô từ vựng được chọn.
  */
  if (deleteWordStats) {
    wrongWordIds.forEach(wordId => {
      const current =
        ensureReviewFields(
          wordStats[wordId] || {}
        );

      current.correct = 0;
current.wrong = 0;
current.correctStreak = 0;
current.lapses = 0;
current.mastered = false;
current.intervalDays = 0;
current.due = null;
current.lastReviewed = null;

      wordStats[wordId] = current;
    });

    deletedWordCount =
      wrongWordIds.length;

    saveStats();
  }

  /*
    Chỉ xóa thống kê Example
    nếu ô Example được chọn.
  */
  if (deleteExampleStats) {
    wrongExampleIds.forEach(
      exampleId => {
        const current =
          ensureExampleStatsFields(
            exampleStats[exampleId] || {}
          );

        current.correct = 0;
current.wrong = 0;
current.correctStreak = 0;
current.lapses = 0;
current.mastered = false;
current.appeared = 0;
current.intervalDays = 0;
current.due = null;
current.lastReviewed = null;

        exampleStats[exampleId] =
          current;
      }
    );

    deletedExampleCount =
      wrongExampleIds.length;

    saveExampleStats();
  }

  /*
    Đóng modal trước khi cập nhật giao diện.
  */
  closeResetStatsModal();

  renderStats();
  renderVocabList();
  filterVocab();

  /*
    Tạo lại danh sách câu hỏi theo
    trọng số mới nếu đang ở Quiz.
  */
  if (
    quizPanel &&
    !quizPanel.classList.contains(
      'hidden'
    )
  ) {
    startQuiz();
  } else {
    resetLearning();
  }

  const deletedParts = [];

  if (deleteWordStats) {
    deletedParts.push(
      `${deletedWordCount} từ vựng`
    );
  }

  if (deleteExampleStats) {
    deletedParts.push(
      `${deletedExampleCount} Example`
    );
  }

  showNotification(
    `Đã xóa thống kê của ${deletedParts.join(' và ')}.`
  );
}
function renderStats() {
  if (!statsSummary) return;

  const totalWords =
    getTotalWords();

  const correctCount =
    getCorrectCount();

  const wrongCount =
    getWrongCount();

  const starredCount =
    getStarredCount();

  const newWordCount =
    getNewWordCount();

  const wrongWords =
    getWrongWordsForStats();

  const wrongExamples =
    getWrongExamplesForStats();

  statsSummary.innerHTML = `
    <div class="stats-row">
      <strong>Tổng số từ:</strong>
      <span>${totalWords}</span>
    </div>

    <div class="stats-row">
      <strong>Tổng lượt đúng:</strong>
      <span>${correctCount}</span>
    </div>

    <div class="stats-row">
      <strong>Tổng lượt sai:</strong>
      <span>${wrongCount}</span>
    </div>

    <div class="stats-row">
      <strong>Từ sao:</strong>
      <span>${starredCount}</span>
    </div>

    <div class="stats-row">
      <strong>Đến hạn:</strong>

      <span>
        ${getDueWordCount()}
      </span>
    </div>

    <div class="stats-row">
      <strong>Từ mới:</strong>
      <span>${newWordCount}</span>
    </div>

    <div class="stats-row stats-title">
      Từ vựng đã làm sai:
    </div>

    ${
      wrongWords.length > 0
        ? `
          <div class="wrong-stats-list">
            ${wrongWords
              .map((entry, index) => `
                <div class="stats-word">
                  <strong class="stats-english-word">
  ${index + 1}.
  ${escapeHtml(entry.english)}
</strong>

<span class="stats-count">
  Loại từ:
  ${escapeHtml(entry.category)}
</span>

<span class="stats-count">
  Sai: ${entry.wrong}
  · Đúng liên tiếp:
  ${entry.correctStreak}/10
</span>
                </div>
              `)
              .join('')}
          </div>
        `
        : `
          <div class="stats-row">
            Chưa có từ nào làm sai.
          </div>
        `
    }

    <div class="stats-row stats-title">
      Example đã làm sai:
    </div>

    ${
      wrongExamples.length > 0
        ? `
          <div class="wrong-stats-list">
            ${wrongExamples
              .map((entry, index) => `
                <div class="stats-word">
                  <strong class="stats-english-word">
                    ${index + 1}.
                    ${escapeHtml(
                      entry.exampleText
                    )}
                  </strong>

                  <span class="stats-count">
  Sai: ${entry.wrong}
  · Đúng liên tiếp:
  ${entry.correctStreak || 0}/10
</span>
                </div>
              `)
              .join('')}
          </div>
        `
        : `
          <div class="stats-row">
            Chưa có Example nào làm sai.
          </div>
        `
    }

    <button
      id="resetWrongStatsBtn"
      type="button"
      class="danger-btn reset-wrong-stats-btn"
      ${
        wrongWords.length === 0 &&
        wrongExamples.length === 0
          ? 'disabled'
          : ''
      }
    >
      Xóa thống kê sai
    </button>
  `;

  /*
    Nút được tạo trong innerHTML,
    vì vậy phải gắn sự kiện sau innerHTML.
  */
  const resetWrongStatsBtn =
    statsSummary.querySelector(
      '#resetWrongStatsBtn'
    );

  if (resetWrongStatsBtn) {
    resetWrongStatsBtn.addEventListener(
      'click',
      resetWrongWordStats
    );
  }
}

function renderVocabList() {
  if (!vocabList) return;
  const listItems = getFilteredVocabItems();
  if (listItems.length === 0) {
    vocabList.innerHTML = '<div class="vocab-empty">Không tìm thấy từ phù hợp.</div>';
    return;
  }
  vocabList.innerHTML = listItems
    .map((item, index) => {
      const stats = wordStats[makeWordId(item)] || { starred: false };
      const starClass = stats.starred ? 'star-btn starred' : 'star-btn';
      return `
      <div class="vocab-item">
        <div class="vocab-detail">
          <span class="vocab-word">${escapeHtml(item.english)}</span>
         ${
  item.pronunciation
    ? `<span class="vocab-pronunciation">${escapeHtml(item.pronunciation)}</span>`
    : '<span class="vocab-pronunciation" style="color: #cbd5e1;">...</span>'
}
          <span class="vocab-meaning">${escapeHtml(item.vietnamese)}</span>
          ${
  normalizeExamples(item.examples).length > 0
    ? `
      <div class="vocab-examples">
        ${normalizeExamples(item.examples)
          .map(example => `
            <div class="vocab-example">
              • ${escapeHtml(example)}
            </div>
          `)
          .join('')}
      </div>
    `
    : ''
}
        </div>
        <div class="vocab-meta">
         <button
  class="speak-btn"
  data-index="${index}"
  aria-label="Đọc từ"
>
  🔊
</button>
          <button class="${starClass}" data-index="${index}" aria-label="Gắn sao từ">★</button>
          <span class="vocab-category">${getCategoryDisplay(item)}</span>
          <span class="vocab-tags">${getTagsDisplay(item)}</span>
          <button class="edit-btn" data-index="${index}" aria-label="Chỉnh sửa từ">✏️</button>
          <button class="delete-btn" data-index="${index}" aria-label="Xóa từ">×</button>
        </div>
      </div>
    `;
    })
    .join('');

  vocabList.querySelectorAll('.speak-btn').forEach(btn => {
  btn.addEventListener('click', event => {
    const index = Number(
      event.currentTarget.dataset.index
    );

    const listItems =
      getFilteredVocabItems();

    const target =
      listItems[index];

    if (!target) return;

    playListenWord(target.english);
  });
});

  vocabList.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      const index = Number(event.currentTarget.dataset.index);
      const listItems = getFilteredVocabItems();
      const target = listItems[index];
      toggleWordStar(target);
    });
  });

  vocabList.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      const index = Number(event.currentTarget.dataset.index);
      const listItems = getFilteredVocabItems();
      const target = listItems[index];
      openEditModal(target);
    });
  });

  vocabList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      const index = Number(event.currentTarget.dataset.index);
      const listItems = getFilteredVocabItems();
      const target = listItems[index];
      const deleteIndex = vocab.findIndex(item => makeWordId(item) === makeWordId(target));
      if (deleteIndex !== -1) {
        vocab.splice(deleteIndex, 1);
      }
      saveVocab();
      populateCategoryOptions();
      renderVocabList();
      resetLearning();
    });
  });
}


function setMode(mode) {

  const isLearn =
    mode === 'learn';

  const isQuiz =
    mode === 'quiz';

  const isPractice =
    mode === 'practice';

  const isLesson =
    mode === 'lesson';


  // Cập nhật trạng thái nút
  learnModeBtn?.classList.toggle(
    'active',
    isLearn
  );

  quizModeBtn?.classList.toggle(
    'active',
    isQuiz
  );

  practiceModeBtn?.classList.toggle(
    'active',
    isPractice
  );

  lessonModeBtn?.classList.toggle(
    'active',
    isLesson
  );


  // Hiển thị các khu vực tương ứng
  learnPanel?.classList.toggle(
    'hidden',
    !isLearn
  );

  quizPanel?.classList.toggle(
    'hidden',
    !isQuiz
  );

  practicePanel?.classList.toggle(
    'hidden',
    !isPractice
  );

  lessonPanel?.classList.toggle(
    'hidden',
    !isLesson
  );


  // Mở rộng giao diện khi vào Bài học
  mainGrid?.classList.toggle(
    'lesson-mode-active',
    isLesson
  );


  // Bộ lọc Flashcard và Quiz
  panelTop?.classList.toggle(
    'hidden',
    isPractice || isLesson
  );


  // Khi mở Bài học
  if (isLesson) {

    renderLessonTagList();

    return;
  }


  // Khi mở Flashcard
  if (isLearn) {

    resetLearning();

    return;
  }


  // Khi mở Quiz
  if (isQuiz) {

    startQuiz();

  }

}


/* ========================================
   HỆ THỐNG BÀI TẬP TƯƠNG TÁC
   ======================================== */


/*
  Chuẩn hóa đáp án.

  - Không phân biệt chữ hoa/thường.
  - Bỏ khoảng trắng thừa.
  - Chuẩn hóa dấu nháy.
*/
function normalizePracticeAnswer(value) {

  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ');
}


/*
  So sánh đáp án.
*/
function isPracticeAnswerCorrect(
  userAnswer,
  acceptedAnswers,
  strict = false
) {

  const answers =
    Array.isArray(acceptedAnswers)
      ? acceptedAnswers
      : [acceptedAnswers];


  if (strict) {

    const user =
      String(userAnswer || '').trim();

    return answers.some(
      answer =>
        user ===
        String(answer || '').trim()
    );
  }


  const normalizedUser =
    normalizePracticeAnswer(userAnswer);


  return answers.some(
    answer =>
      normalizePracticeAnswer(answer) ===
      normalizedUser
  );
}


/*
  Kiểm tra cấu trúc mã bài tập.
*/
function validatePracticeLesson(data) {

  if (
    !data ||
    typeof data !== 'object'
  ) {
    throw new Error(
      'Mã bài tập phải là một object JSON.'
    );
  }


  if (
    !Array.isArray(data.exercises)
  ) {
    throw new Error(
      'Thiếu mảng "exercises".'
    );
  }


  if (data.exercises.length === 0) {
    throw new Error(
      'Bài tập chưa có câu hỏi.'
    );
  }


  data.exercises.forEach(
    (exercise, index) => {

      const validTypes = [
        'fill',
        'listen',
        'correct',
        'short'
      ];


      if (
        !validTypes.includes(
          exercise.type
        )
      ) {
        throw new Error(
          `Câu ${index + 1}: type không hợp lệ.`
        );
      }


      if (
        !exercise.answer &&
        !Array.isArray(exercise.answers)
      ) {
        throw new Error(
          `Câu ${index + 1}: thiếu answer hoặc answers.`
        );
      }
    }
  );


  return true;
}


/*
  Lấy các đáp án được chấp nhận.
*/
function getPracticeAcceptedAnswers(
  exercise
) {

  if (
    Array.isArray(exercise.answers)
  ) {
    return exercise.answers;
  }


  return [exercise.answer];
}


/*
  Hiện lỗi mã bài tập.
*/
function showPracticeCodeError(message) {

  if (!practiceCodeError) return;


  practiceCodeError.textContent =
    message;

  practiceCodeError.classList.remove(
    'hidden'
  );
}


/*
  Xóa báo lỗi.
*/
function hidePracticeCodeError() {

  if (!practiceCodeError) return;


  practiceCodeError.textContent = '';

  practiceCodeError.classList.add(
    'hidden'
  );
}


/*
  Đọc JSON người dùng dán vào.
*/
function loadPracticeFromCode() {

  hidePracticeCodeError();


  const code =
    practiceCodeInput?.value.trim();


  if (!code) {

    showPracticeCodeError(
      'Bạn chưa nhập mã bài tập.'
    );

    return;
  }


  try {

    const data =
      JSON.parse(code);


    validatePracticeLesson(data);


    currentPracticeLesson = data;


    renderPracticeLesson();


    showNotification(
      '✅ Đã tải bài tập.',
      1800
    );

  } catch (error) {

    console.error(
      'Practice code error:',
      error
    );


    showPracticeCodeError(
      'Không thể chạy mã bài tập: ' +
      error.message
    );
  }
}


/*
  Tạo giao diện một câu hỏi.
*/
function createPracticeQuestion(
  exercise,
  index
) {

  const wrapper =
    document.createElement('div');


  wrapper.className =
    'practice-question';

  wrapper.dataset.practiceIndex =
    String(index);


  const number =
    document.createElement('div');

  number.className =
    'practice-question-number';

  number.textContent =
    `Câu ${index + 1}`;


  wrapper.appendChild(number);


  /*
    Với câu nghe, không hiển thị
    nội dung audioText.
  */
  if (
    exercise.prompt &&
    exercise.type !== 'listen'
  ) {

    const prompt =
      document.createElement('div');

    prompt.className =
      'practice-question-prompt';

    prompt.textContent =
      exercise.prompt;

    wrapper.appendChild(prompt);
  }


  /*
    Câu nghe.
  */
  if (exercise.type === 'listen') {

    if (exercise.prompt) {

      const instruction =
        document.createElement('div');

      instruction.className =
        'practice-question-prompt';

      instruction.textContent =
        exercise.prompt;

      wrapper.appendChild(
        instruction
      );
    }


    const listenRow =
      document.createElement('div');

    listenRow.className =
      'practice-listen-row';


    const listenBtn =
      document.createElement('button');

    listenBtn.type =
      'button';

    listenBtn.className =
      'secondary-btn practice-listen-btn';

    listenBtn.textContent =
      '🔊 Nghe';


    listenBtn.addEventListener(
      'click',
      () => {

        const speechText =
          exercise.audioText ||
          exercise.answer ||
          '';


        if (speechText) {
          playListenWord(
            speechText
          );
        }
      }
    );


    listenRow.appendChild(
      listenBtn
    );


    wrapper.appendChild(
      listenRow
    );
  }


  /*
    Ô nhập đáp án.
  */
  const input =
    document.createElement('input');


  input.type = 'text';

  input.className =
    'practice-answer-input';

  input.placeholder =
    exercise.placeholder ||
    'Nhập đáp án...';

  input.autocomplete = 'off';

  input.dataset.practiceAnswer =
    String(index);


  wrapper.appendChild(input);


  /*
    Nút kiểm tra riêng từng câu.
  */
  const checkButton =
    document.createElement('button');


  checkButton.type =
    'button';

  checkButton.className =
    'secondary-btn';

  checkButton.textContent =
    'Kiểm tra';


  checkButton.addEventListener(
    'click',
    () => {
      checkPracticeQuestion(index);
    }
  );


  wrapper.appendChild(
    checkButton
  );


  /*
    Nơi hiển thị đúng / sai.
  */
  const feedback =
    document.createElement('div');


  feedback.className =
    'practice-feedback hidden';

  feedback.dataset.practiceFeedback =
    String(index);


  wrapper.appendChild(
    feedback
  );


  /*
    Enter = kiểm tra.
  */
  input.addEventListener(
    'keydown',
    event => {

      if (
        event.key !== 'Enter'
      ) {
        return;
      }


      event.preventDefault();
      event.stopPropagation();


      checkPracticeQuestion(
        index
      );
    }
  );


  return wrapper;
}


/*
  Hiển thị toàn bộ bài.
*/
function renderPracticeLesson() {

  if (
    !currentPracticeLesson ||
    !practiceQuestions
  ) {
    return;
  }


  hidePracticeCodeError();


  practiceWorkspace?.classList.remove(
    'hidden'
  );


  practiceTitle.textContent =
    currentPracticeLesson.title ||
    'Bài tập';


  practiceInstructions.textContent =
    currentPracticeLesson.instructions ||
    'Hoàn thành các câu hỏi bên dưới.';


  /*
    Đoạn văn dùng cho Reading.
  */
  const passage =
    String(
      currentPracticeLesson.passage ||
      ''
    ).trim();


  if (passage) {

    practicePassage.textContent =
      passage;

    practicePassage.classList.remove(
      'hidden'
    );

  } else {

    practicePassage.textContent = '';

    practicePassage.classList.add(
      'hidden'
    );
  }


  practiceQuestions.innerHTML = '';


  currentPracticeLesson.exercises
    .forEach(
      (exercise, index) => {

        practiceQuestions.appendChild(
          createPracticeQuestion(
            exercise,
            index
          )
        );
      }
    );


  updatePracticeScore();


  const firstInput =
    practiceQuestions.querySelector(
      '.practice-answer-input'
    );

  firstInput?.focus();
}


/*
  Chấm một câu.
*/
function checkPracticeQuestion(index) {

  if (!currentPracticeLesson) return;


  const exercise =
    currentPracticeLesson
      .exercises[index];


  if (!exercise) return;


  const input =
    document.querySelector(
      `[data-practice-answer="${index}"]`
    );


  const feedback =
    document.querySelector(
      `[data-practice-feedback="${index}"]`
    );


  if (
    !input ||
    !feedback
  ) {
    return;
  }


  const userAnswer =
    input.value.trim();


  if (!userAnswer) {

    feedback.textContent =
      '⚠️ Bạn chưa nhập đáp án.';

    feedback.className =
      'practice-feedback wrong';

    return;
  }


  const acceptedAnswers =
    getPracticeAcceptedAnswers(
      exercise
    );


  const correct =
    isPracticeAnswerCorrect(
      userAnswer,
      acceptedAnswers,
      exercise.strict === true
    );


  input.classList.remove(
    'correct',
    'wrong'
  );


  feedback.classList.remove(
    'hidden',
    'correct',
    'wrong'
  );


  if (correct) {

    input.classList.add(
      'correct'
    );

    feedback.classList.add(
      'correct'
    );

    feedback.innerHTML =
      '<strong>✓ Chính xác</strong>';


  } else {

    input.classList.add(
      'wrong'
    );

    feedback.classList.add(
      'wrong'
    );


    const answerText =
      acceptedAnswers.join(' / ');


    feedback.innerHTML =
      `<strong>✗ Chưa đúng</strong>` +
      `<div>Đáp án: ${
        escapeHtml(answerText)
      }</div>`;
  }


  /*
    Giải thích sau khi chấm.
  */
  if (exercise.explanation) {

    const explanation =
      document.createElement('div');


    explanation.className =
      'practice-explanation';


    explanation.textContent =
      exercise.explanation;


    feedback.appendChild(
      explanation
    );
  }


  input.dataset.checked =
    'true';

  input.dataset.correct =
    String(correct);


  updatePracticeScore();
}


/*
  Cập nhật điểm.
*/
function updatePracticeScore() {

  if (
    !currentPracticeLesson ||
    !practiceScore
  ) {
    return;
  }


  const total =
    currentPracticeLesson
      .exercises.length;


  const correct =
    document.querySelectorAll(
      '.practice-answer-input[data-correct="true"]'
    ).length;


  practiceScore.textContent =
    `${correct} / ${total}`;
}


/*
  Chấm toàn bộ bài.
*/
function checkAllPracticeQuestions() {

  if (!currentPracticeLesson) return;


  currentPracticeLesson.exercises
    .forEach(
      (_, index) => {

        checkPracticeQuestion(
          index
        );
      }
    );


  const total =
    currentPracticeLesson
      .exercises.length;


  const correct =
    document.querySelectorAll(
      '.practice-answer-input[data-correct="true"]'
    ).length;


  if (correct === total) {

    showNotification(
      `🎉 Chính xác ${correct}/${total} câu.`,
      3000
    );

  } else {

    showNotification(
      `Kết quả: ${correct}/${total} câu đúng.`,
      3000
    );
  }
}


/*
  Làm lại bài hiện tại.
*/
function resetPracticeLesson() {

  if (!currentPracticeLesson) {
    return;
  }


  renderPracticeLesson();
}


/*
  Xóa mã bài tập.
*/
function clearPracticeCode() {

  if (practiceCodeInput) {
    practiceCodeInput.value = '';
  }


  currentPracticeLesson = null;


  if (practiceQuestions) {
    practiceQuestions.innerHTML = '';
  }


  practiceWorkspace?.classList.add(
    'hidden'
  );


  hidePracticeCodeError();


  practiceCodeInput?.focus();
}

function resetLearning() {
  filterVocab();
  currentFlashcard = filteredVocab.length > 0 ? weightedRandomItem(filteredVocab) : null;
  isFlipped = false;
  renderFlashcard();
}

function renderFlashcard() {
  if (!currentFlashcard) {
    flashCategory.textContent = 'Loại từ: -';
    flashFront.textContent = 'Không có từ nào';
    flashBack.textContent = '';
    const flashTags = document.getElementById('flashTags');
    if (flashTags) flashTags.innerHTML = '';
    return;
  }
  flashCategory.textContent = `Loại từ: ${currentFlashcard.category || 'Tự tạo'}`;
  const flashTags = document.getElementById('flashTags');
  if (flashTags) {
    flashTags.innerHTML = currentFlashcard.tags ? currentFlashcard.tags.map(tag => `<span class="flash-tag">${tag}</span>`).join('') : '';
  }
  // Chỉ hiển thị một ngôn ngữ tại một thời điểm.
  // Mặc định (chưa lật): hiển thị từ tiếng Anh. Khi lật: hiển thị nghĩa tiếng Việt.
  flashFront.textContent = isFlipped ? currentFlashcard.vietnamese : currentFlashcard.english;
  // Giữ vùng phụ (flashBack) ẩn vì không cần hiển thị song song cả hai ngôn ngữ.
  if (flashBack) {
    flashBack.textContent = isFlipped ? '' : (currentFlashcard.pronunciation || '');
    if (isFlipped) {
      flashBack.classList.add('hidden');
    } else {
      flashBack.classList.remove('hidden');
    }
  }
}

function changeCard(step = null) {
  if (step !== null) {
    currentIndex = (currentIndex + step + filteredVocab.length) % filteredVocab.length;
    currentFlashcard = filteredVocab[currentIndex];
  } else {
    currentFlashcard = filteredVocab.length > 0 ? weightedRandomItem(filteredVocab) : null;
    currentIndex = filteredVocab.indexOf(currentFlashcard);
  }
  isFlipped = false;
  renderFlashcard();
}
function updateScore() {
  if (!scoreDisplay) return;

  scoreDisplay.textContent = `Điểm: ${score}`;
}
function startQuiz() {
  filterVocab();

  score = 0;
  currentIndex = 0;
  currentQuestion = null;

  quizWrongAnswers = [];
  quizFinished = false;

  /*
    Xóa và ẩn giao diện của trò chơi trước.
  */
  answersContainer.innerHTML = '';
  matchEnglishColumn.innerHTML = '';
  matchVietnameseColumn.innerHTML = '';
  matchMessage.textContent = '';

  answersContainer.classList.add('hidden');
  typingContainer.classList.add('hidden');
  matchContainer.classList.add('hidden');
  listenContainer.classList.add('hidden');

  typingInput.value = '';
  typingInput.dataset.answered = 'false';
  typingInput.readOnly = false;

  listenInput.value = '';
  listenInput.dataset.answered = 'false';
  listenInput.readOnly = false;

  /*
    Tạo lại danh sách câu hỏi theo trò vừa chọn.
  */
  questions = generateQuestions();

  quizQuestionCard?.classList.remove('hidden');
  quizResultPanel?.classList.add('hidden');
  nextQuizBtn?.classList.remove('hidden');

  if (quizWrongList) {
    quizWrongList.innerHTML = '';
  }

  if (quizResultSummary) {
    quizResultSummary.innerHTML = '';
  }

  updateScore();
  showQuestion();
}

function generateQuestions() {
  /*
  filterVocab() luôn tạo danh sách phù hợp
  với tìm kiếm, loại từ, tag và chế độ ôn.
*/
let source = [...filteredVocab];

  const mode =
    quizTypeSelect.value;

  const direction =
    directionSelect.value;


    /*
  Nối từ lấy danh sách theo tìm kiếm,
  loại từ và tag, nhưng không bị giới hạn
  bởi trạng thái ôn tập.
*/
if (mode === 'match') {
  source = getFilteredVocabItems();
}

  /*
  Riêng Nghe và viết → Example:
  chuyển từng câu Example thành một câu hỏi riêng.
*/
if (
  mode === 'listen' &&
  direction === 'example'
) {
  const exampleQuestionMap =
    new Map();

  source.forEach(item => {
    const examples =
      getQuestionExamples(item);

    examples.forEach(exampleText => {
      const normalizedExample =
        String(exampleText || '').trim();

      if (!normalizedExample) return;

      const exampleId =
        makeExampleId(
          normalizedExample
        );

      if (
        exampleQuestionMap.has(
          exampleId
        )
      ) {
        return;
      }

      exampleQuestionMap.set(
        exampleId,
        {
          ...item,
          quizExample:
            normalizedExample,
          exampleId,
          isExampleQuestion: true
        }
      );
    });
  });

  source = [
    ...exampleQuestionMap.values()
  ];
}

if (source.length === 0) {
  return [];
}

  const requestedCount = Math.max(
    1,
    Math.floor(
      Number(quizCountSelect.value) || 10
    )
  );

  /*
    TRÒ NỐI TỪ

    Mỗi vòng sử dụng 4 từ.
    Toàn bộ từ cũng được chọn bằng
    thuật toán ưu tiên giống trò khác.
  */
  if (mode === 'match') {
    const wordsPerRound = 4;

    const maximumRounds = Math.floor(
      source.length / wordsPerRound
    );

    const numberOfRounds = Math.min(
      requestedCount,
      maximumRounds
    );

    if (numberOfRounds <= 0) {
      return [];
    }

    const totalWordsNeeded =
      numberOfRounds * wordsPerRound;

    const selectedWords =
  selectWordItemsWithQuota(
    source,
    totalWordsNeeded
  );

    const rounds = [];

    for (
      let index = 0;
      index < selectedWords.length;
      index += wordsPerRound
    ) {
      const round = selectedWords.slice(
        index,
        index + wordsPerRound
      );

      if (round.length === wordsPerRound) {
        rounds.push(round);
      }
    }

    return rounds;
  }
/*
  Riêng Nghe và viết → Example
  sử dụng trọng số của từng câu Example.
*/
if (
  mode === 'listen' &&
  direction === 'example'
) {
  return selectExampleItemsWithQuota(
    source,
    requestedCount
  );
}

/*
  Các trò chơi và hướng học còn lại
  tiếp tục dùng trọng số của từ vựng.
*/
return selectWordItemsWithQuota(
  source,
  requestedCount
);
}

function showQuestion() {
  const mode = quizTypeSelect.value;
  const direction = directionSelect.value;

  if (questions.length === 0) {
    currentQuestion = null;

    questionNumber.textContent = 'Không có câu hỏi';

    questionText.textContent =
      mode === 'listen' && direction === 'example'
        ? 'Không có từ nào chứa câu ví dụ.'
        : 'Không có từ vựng phù hợp.';

    answersContainer.innerHTML = '';
    answersContainer.classList.add('hidden');
    typingContainer.classList.add('hidden');
    matchContainer.classList.add('hidden');
    listenContainer.classList.add('hidden');

    return;
  }
currentQuestion = questions[currentIndex];

if (
  mode === 'listen' &&
  direction === 'example'
) {
  markExampleAppeared(
    currentQuestion
  );
}

questionNumber.textContent =
  `Câu ${currentIndex + 1}/${questions.length}`;

  if (mode === 'multiple') {
    typingContainer.classList.add('hidden');
    matchContainer.classList.add('hidden');
    listenContainer.classList.add('hidden');

    answersContainer.classList.remove('hidden');
    answersContainer.innerHTML = '';

    const answerField =
      direction === 'enToVn'
        ? 'vietnamese'
        : 'english';

    const options =
      createOptions(currentQuestion, answerField);

    const categoryText =
      getCategoryDisplay(currentQuestion);

    questionText.textContent =
      direction === 'enToVn'
        ? `Tiếng Anh: ${currentQuestion.english} — Loại từ: ${categoryText}`
        : `Tiếng Việt: ${currentQuestion.vietnamese} — Loại từ: ${categoryText}`;

    options.forEach(option => {
      const button =
        document.createElement('button');

      button.className = 'answer-btn';
      button.textContent = option[answerField];

      button.addEventListener('click', () => {
        handleAnswer(
          option[answerField],
          answerField
        );
      });

      answersContainer.appendChild(button);
    });

    return;
  }

  if (mode === 'typing') {
    answersContainer.innerHTML = '';
    answersContainer.classList.add('hidden');
    matchContainer.classList.add('hidden');
    listenContainer.classList.add('hidden');
    typingContainer.classList.remove('hidden');

    const categoryText =
      getCategoryDisplay(currentQuestion);

    questionText.textContent =
      direction === 'enToVn'
        ? `Tiếng Anh: ${currentQuestion.english} — Loại từ: ${categoryText}`
        : `Tiếng Việt: ${currentQuestion.vietnamese} — Loại từ: ${categoryText}`;

    typingInput.value = '';
    typingInput.readOnly = false;
    typingInput.dataset.answered = 'false';
    typingInput.focus();

    return;
  }

  if (mode === 'listen') {
    answersContainer.innerHTML = '';
    answersContainer.classList.add('hidden');
    matchContainer.classList.add('hidden');
    typingContainer.classList.add('hidden');
    listenContainer.classList.remove('hidden');

    const isExampleMode =
  direction === 'example';

const isEnToVnMode =
  direction === 'enToVn';

questionText.textContent =
  isExampleMode
    ? 'Nghe và viết lại câu ví dụ'
    : isEnToVnMode
      ? 'Nghe tiếng Anh và viết nghĩa tiếng Việt'
      : 'Nghe tiếng Anh và viết lại từ tiếng Anh';

listenButton.textContent =
  isExampleMode
    ? 'Nghe câu ví dụ'
    : 'Nghe lại';

listenInput.placeholder =
  isExampleMode
    ? 'Nhập câu bạn nghe được'
    : isEnToVnMode
      ? 'Viết nghĩa tiếng Việt bạn nghe được'
      : 'Viết từ tiếng Anh bạn nghe được';

    listenInput.value = '';
    listenInput.readOnly = false;
    listenInput.dataset.answered = 'false';
    listenInput.focus();

    const textToSpeak =
  getListenSpeechText(currentQuestion);

    if (textToSpeak) {
      playListenWord(textToSpeak);
    }

    return;
  }

  if (mode === 'match') {
    answersContainer.innerHTML = '';
    answersContainer.classList.add('hidden');
    matchContainer.classList.remove('hidden');
    listenContainer.classList.add('hidden');
    typingContainer.classList.add('hidden');

    currentMatchItems =
      questions[currentIndex];

    questionText.textContent =
      direction === 'enToVn'
        ? 'Nối tiếng Anh với nghĩa tiếng Việt'
        : 'Nối tiếng Việt với từ tiếng Anh';

    buildMatchGame(
      currentMatchItems,
      direction
    );
  }
}

function createOptions(question, field = 'english') {
  const options = [question];
  const others = vocab.filter(item => item.english !== question.english);
  while (options.length < 4 && others.length > 0) {
    const randomIndex = Math.floor(Math.random() * others.length);
    options.push(others.splice(randomIndex, 1)[0]);
  }
  return options.sort(() => Math.random() - 0.5);
}
/*
  Chỉ dùng cho Quiz.

  Xóa toàn bộ nội dung nằm trong dấu ngoặc tròn,
  nhưng không sửa dữ liệu từ vựng gốc.

  Ví dụ:
  "mèo (con mèo)" -> "mèo"
  "chạy (di chuyển nhanh) (thể thao)" -> "chạy"
*/
function removeQuizParenthesesContent(value) {
  return String(value || '')
    .replace(/\([^()]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/*
  Lấy các nghĩa tiếng Việt dùng trong Quiz.

  Nội dung trong dấu ngoặc tròn sẽ không được dùng.
*/
function getQuizVietnameseMeanings(item) {
  const meanings =
    getVietnameseMeaningsForDisplay(item);

  const cleanedMeanings = meanings
    .map(meaning =>
      removeQuizParenthesesContent(meaning)
    )
    .filter(Boolean);

  /*
    Xóa nghĩa trùng sau khi bỏ ngoặc.

    Ví dụ:
    "mèo (con mèo)" và "mèo (động vật)"
    đều trở thành "mèo".
  */
  return cleanedMeanings.filter(
    (meaning, index, array) =>
      array.findIndex(
        otherMeaning =>
          normalizeText(otherMeaning) ===
          normalizeText(meaning)
      ) === index
  );
}
function getVietnameseVariants(item) {
  return getQuizVietnameseMeanings(item)
    .map(meaning =>
      normalizeText(meaning)
    )
    .filter(Boolean);
}

function getVietnameseMeaningsForDisplay(item) {
  if (Array.isArray(item.vietnamese)) {
    return item.vietnamese
      .map(meaning => String(meaning).trim())
      .filter(Boolean);
  }

  return String(item.vietnamese || '')
    .split('|')
    .map(meaning => meaning.trim())
    .filter(Boolean);
}

function isTypingAnswerCorrect(answer, item) {
  const normalizedAnswer = normalizeText(answer);

  if (directionSelect.value === 'vnToEn') {
    const englishAnswers = getEnglishVariants(item);

    return englishAnswers.some(
      englishAnswer => normalizedAnswer === englishAnswer
    );
  }

  const vietnameseAnswers = getVietnameseVariants(item);

  return vietnameseAnswers.some(
    vietnameseAnswer => normalizedAnswer === vietnameseAnswer
  );
}
/*
  Lưu một câu trả lời sai để hiển thị
  trong bảng kết quả cuối Quiz.
*/
function recordQuizWrong(
  item,
  userAnswer = '',
  quizType = ''
) {
  if (!item) return;

  const isExampleRecord =
    quizType === 'listen' &&
    directionSelect.value === 'example';

  const recordId = isExampleRecord
    ? makeExampleId(
        item.quizExample || ''
      )
    : makeWordId(item);

  /*
    Nối từ có thể sai cùng một từ nhiều lần.
    Example cũng được gom theo chính câu Example.
  */
  const existingRecord =
    quizWrongAnswers.find(record =>
      record.recordId === recordId &&
      record.quizType === quizType
    );

  if (existingRecord) {
    existingRecord.wrongCount += 1;

    existingRecord.userAnswer =
      String(userAnswer || '').trim();

    return;
  }

  const correctAnswer =
  quizType === 'listen'
    ? getListenAnswer(item)
    : directionSelect.value === 'vnToEn'
      ? String(item.english || '').trim()
      : getQuizVietnameseMeanings(item)
          .join(', ');

  quizWrongAnswers.push({
    recordId,

    /*
      Giữ wordId để không ảnh hưởng
      những đoạn cũ có thể còn sử dụng.
    */
    wordId: isExampleRecord
      ? ''
      : makeWordId(item),

    item,
    quizType,

    isExample:
      isExampleRecord,

    exampleText:
      isExampleRecord
        ? String(
            item.quizExample || ''
          ).trim()
        : '',

    userAnswer:
      String(userAnswer || '').trim(),

    correctAnswer,

    wrongCount: 1
  });
}

/*
  Hiển thị kết quả sau khi làm xong Quiz.
*/
function showQuizResults() {
  quizFinished = true;

  quizQuestionCard?.classList.add('hidden');
  quizResultPanel?.classList.remove('hidden');
  nextQuizBtn?.classList.add('hidden');

  const totalQuestions = questions.length;

  /*
    Trò nối từ tính điểm theo số từ,
    còn các trò khác tính theo số câu.
  */
  const maximumScore =
    quizTypeSelect.value === 'match'
      ? questions.reduce(
          (total, round) =>
            total +
            (
              Array.isArray(round)
                ? round.length
                : 0
            ),
          0
        )
      : totalQuestions;

  if (questionNumber) {
    questionNumber.textContent =
      `Hoàn thành ${totalQuestions}/${totalQuestions}`;
  }

  if (scoreDisplay) {
    scoreDisplay.textContent =
      `Điểm: ${score}/${maximumScore}`;
  }

  if (quizResultSummary) {
    quizResultSummary.innerHTML = `
      <div class="quiz-result-score">
        ${score}/${maximumScore}
      </div>

      <div class="quiz-result-stat">
        Số câu/từ đúng:
        <strong>${score}</strong>
      </div>

      <div class="quiz-result-stat">
        Số lỗi:
        <strong>${quizWrongAnswers.length}</strong>
      </div>
    `;
  }

  if (!quizWrongList) return;

  /*
    Không có đáp án sai.
  */
  if (quizWrongAnswers.length === 0) {
    quizWrongList.innerHTML = `
      <div class="quiz-perfect-result">
        <div class="quiz-perfect-icon">
          🎉
        </div>

        <strong>
          Bạn đã trả lời đúng toàn bộ!
        </strong>
      </div>
    `;

    return;
  }

  /*
    Có đáp án sai.
  */
  quizWrongList.innerHTML =
    quizWrongAnswers
      .map(record => {
        const item =
          record.item || {};

        const english =
          escapeHtml(
            item.english || ''
          );

        const pronunciation =
          escapeHtml(
            item.pronunciation || ''
          );

        const category =
          escapeHtml(
            getCategoryDisplay(item)
          );

        const meaning =
  escapeHtml(
    getQuizVietnameseMeanings(item)
      .join(', ')
  );

        const userAnswer =
          escapeHtml(
            record.userAnswer ||
            'Không có câu trả lời'
          );

        const correctAnswer =
          escapeHtml(
            record.correctAnswer || ''
          );

        const isExample =
          record.isExample === true;

        const exampleText =
          escapeHtml(
            record.exampleText ||
            record.correctAnswer ||
            ''
          );

        return `
          <div class="quiz-wrong-item">
            ${
              isExample
                ? `
                  <div class="quiz-wrong-word-row">
                    <strong class="quiz-wrong-word">
                      Example
                    </strong>

                    <button
                      type="button"
                      class="quiz-result-speak-btn"
                      data-speak-word="${exampleText}"
                      title="Nghe lại câu Example"
                    >
                      🔊
                    </button>
                  </div>

                  <div class="quiz-wrong-example">
                    ${exampleText}
                  </div>
                `
                : `
                  <div class="quiz-wrong-word-row">
                    <strong class="quiz-wrong-word">
                      ${english}
                    </strong>

                    <button
                      type="button"
                      class="quiz-result-speak-btn"
                      data-speak-word="${english}"
                      title="Nghe phát âm"
                    >
                      🔊
                    </button>
                  </div>

                  ${
                    pronunciation
                      ? `
                        <div class="quiz-wrong-pronunciation">
                          ${pronunciation}
                        </div>
                      `
                      : ''
                  }

                  <div class="quiz-wrong-category">
                    Loại từ: ${category}
                  </div>

                  <div class="quiz-wrong-meaning">
                    Nghĩa: ${meaning}
                  </div>
                `
            }

            <div class="quiz-user-answer">
              Bạn trả lời:
              <span>${userAnswer}</span>
            </div>

            <div class="quiz-wrong-answer">
              Đáp án đúng:
              <strong>${correctAnswer}</strong>
            </div>

            <div class="quiz-wrong-count">
              Sai ${record.wrongCount} lần trong lượt này
            </div>
          </div>
        `;
      })
      .join('');

  /*
    Gắn lại sự kiện cho nút loa
    sau khi kết quả được tạo bằng innerHTML.
  */
  quizWrongList
    .querySelectorAll(
      '.quiz-result-speak-btn'
    )
    .forEach(button => {
      button.addEventListener(
        'click',
        () => {
          const text =
            button.dataset.speakWord || '';

          if (text) {
            playListenWord(text);
          }
        }
      );
    });
}
function handleAnswer(answer, answerField = 'english') {
  const buttons = document.querySelectorAll('.answer-btn');
  const correctValue = currentQuestion[answerField];
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctValue) {
      btn.classList.add('correct');
    }
    if (btn.textContent === answer && answer !== correctValue) {
      btn.classList.add('wrong');
    }
  });
  const isCorrect = answer === correctValue;
  updateWordStats(currentQuestion, isCorrect);
  if (!isCorrect) {
  recordQuizWrong(
    currentQuestion,
    answer,
    'multiple'
  );
}
  if (isCorrect) {
    score += 1;
    updateScore();
  }
}
// ========================================
// KHỞI TẠO VÀ LƯU GIỌNG PHÁT ÂM
// ========================================

function initSpeechAccent() {

  const savedAccent =
    localStorage.getItem('openquizSpeechAccent');

  selectedSpeechAccent =
    savedAccent === 'en-GB'
      ? 'en-GB'
      : 'en-US';

  if (speechAccentSelect) {
    speechAccentSelect.value = selectedSpeechAccent;
  }

}

function getPreferredEnglishVoice() {

  const voices =
    window.speechSynthesis.getVoices();

  const preferredLang =
    selectedSpeechAccent.toLowerCase();

  return (

    // Ưu tiên giọng đúng vùng đã chọn
    voices.find(voice => {

      const voiceLang =
        String(voice.lang || '')
          .toLowerCase()
          .replace(/_/g, '-');

      return (
        voiceLang === preferredLang ||
        voiceLang.startsWith(preferredLang + '-')
      );

    })

  );

}


function playListenWord(text) {

  if (!window.speechSynthesis) {

    showNotification(
      "Trình duyệt không hỗ trợ phát âm."
    );

    return;
  }


  const speak = () => {

    const voices =
      window.speechSynthesis.getVoices();

    const selectedVoice =
      getPreferredEnglishVoice();

    const content =
      String(text || '').trim();


    // Kiểm tra nội dung cần đọc
    if (!content) {

      showNotification(
        "Không có từ để phát âm.",
        2000
      );

      return;
    }


    // Kiểm tra giọng đã chọn có tồn tại không
    if (!selectedVoice) {

      const accentName =
        selectedSpeechAccent === 'en-GB'
          ? 'Anh-Anh'
          : 'Anh-Mỹ';

      showNotification(
        `Không tìm thấy giọng ${accentName} trên thiết bị. Hãy cài đặt giọng tiếng Anh tương ứng.`,
        4000
      );

      console.warn(
        'Không tìm thấy giọng:',
        selectedSpeechAccent,
        voices
      );

      return;
    }


    // Tạo nội dung phát âm
    const utterance =
      new SpeechSynthesisUtterance(content);


    // Sử dụng giọng người dùng đã chọn
    utterance.lang =
      selectedSpeechAccent;

    utterance.voice =
      selectedVoice;


    // Giữ nguyên tốc độ đọc hiện tại
    utterance.rate =
      Number(speechRateSelect?.value) || 0.9;

    utterance.pitch = 1;
    utterance.volume = 1;


    console.log(
      'Đang sử dụng giọng:',
      selectedVoice.name,
      selectedVoice.lang
    );


    // Dừng âm thanh cũ trước khi đọc từ mới
    window.speechSynthesis.cancel();

    setTimeout(() => {

      window.speechSynthesis.speak(
        utterance
      );

    }, 100);

  };


  // Kiểm tra danh sách giọng đã tải chưa
  if (
    window.speechSynthesis.getVoices().length > 0
  ) {

    speak();

  } else {

    window.speechSynthesis.addEventListener(
      'voiceschanged',
      speak,
      { once: true }
    );

  }

}


async function fetchPronunciation(word) {
  const cleanWord =
    String(word || '')
      .trim()
      .toLowerCase();

  if (!cleanWord) {
    return '';
  }

  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/en/${
        encodeURIComponent(cleanWord)
      }`
    );

    if (!response.ok) {
      console.warn(
        `Không tìm thấy phiên âm: ${cleanWord}`,
        response.status
      );

      return '';
    }

    const data = await response.json();

    const entries =
      Array.isArray(data?.entries)
        ? data.entries
        : [];

    /*
      Ưu tiên phiên âm IPA.
    */
    for (const entry of entries) {
      const pronunciations =
        Array.isArray(entry?.pronunciations)
          ? entry.pronunciations
          : [];

      const ipa =
        pronunciations.find(
          pronunciation =>
            pronunciation?.type === 'ipa' &&
            String(
              pronunciation?.text || ''
            ).trim()
        );

      if (ipa) {
        return formatPronunciation(
          ipa.text
        );
      }
    }

    /*
      Nếu không có IPA thì lấy phiên âm
      đầu tiên mà API cung cấp.
    */
    for (const entry of entries) {
      const pronunciations =
        Array.isArray(entry?.pronunciations)
          ? entry.pronunciations
          : [];

      const firstAvailable =
        pronunciations.find(
          pronunciation =>
            String(
              pronunciation?.text || ''
            ).trim()
        );

      if (firstAvailable) {
        return formatPronunciation(
          firstAvailable.text
        );
      }
    }

    return '';
  } catch (error) {
    console.error(
      `Lỗi lấy phiên âm "${cleanWord}":`,
      error
    );

    return '';
  }
}

function formatPronunciation(value) {
  const pronunciation =
    String(value || '').trim();

  if (!pronunciation) {
    return '';
  }

  /*
    Giữ nguyên nếu dữ liệu đã có /.../
    hoặc [...].
  */
  if (
    (
      pronunciation.startsWith('/') &&
      pronunciation.endsWith('/')
    ) ||
    (
      pronunciation.startsWith('[') &&
      pronunciation.endsWith(']')
    )
  ) {
    return pronunciation;
  }

  return `/${pronunciation}/`;
}
let isRepairingPronunciations = false;
let pronunciationRepairTimer = null;

async function repairMissingPronunciations() {
  /*
    Ngăn chạy nhiều lần cùng lúc khi Firebase
    tự gọi lại onValue sau mỗi lần lưu dữ liệu.
  */
  if (isRepairingPronunciations) {
    return;
  }

  const missingItems =
    vocab.filter(item => {
      const english =
        String(item?.english || '').trim();

      const pronunciation =
        String(
          item?.pronunciation || ''
        ).trim();

      return english && !pronunciation;
    });

  if (missingItems.length === 0) {
    return;
  }

  isRepairingPronunciations = true;

  let updatedCount = 0;

  try {
    /*
      Lưu kết quả theo từ tiếng Anh để tránh
      gọi API lặp lại khi cùng một từ có nhiều
      nghĩa hoặc nhiều loại từ.
    */
    const pronunciationCache =
      new Map();

    for (const originalItem of missingItems) {
      const english =
        String(
          originalItem.english || ''
        ).trim();

      const cacheKey =
        english.toLowerCase();

      let pronunciation = '';

      if (
        pronunciationCache.has(cacheKey)
      ) {
        pronunciation =
          pronunciationCache.get(cacheKey);
      } else {
        pronunciation =
          await fetchPronunciation(english);

        pronunciationCache.set(
          cacheKey,
          pronunciation
        );

        /*
          Nghỉ giữa các lần gọi API để tránh
          gửi quá nhiều yêu cầu cùng lúc.
        */
        await new Promise(resolve =>
          setTimeout(resolve, 200)
        );
      }

      if (!pronunciation) {
        continue;
      }

      /*
        Firebase có thể đã thay lại mảng vocab,
        nên phải tìm lại các từ theo tiếng Anh.
      */
      vocab.forEach(item => {
        const sameEnglish =
          String(item?.english || '')
            .trim()
            .toLowerCase() === cacheKey;

        const stillMissing =
          !String(
            item?.pronunciation || ''
          ).trim();

        if (
          sameEnglish &&
          stillMissing
        ) {
          item.pronunciation =
            pronunciation;

          updatedCount += 1;
        }
      });
    }

    if (updatedCount > 0) {
      /*
        Lưu một lần sau khi đã quét xong,
        tránh Firebase cập nhật liên tục.
      */
      saveVocab();

      renderVocabList();
      resetLearning();

      showNotification(
        `Đã tự bổ sung phiên âm cho ${updatedCount} từ.`,
        3500
      );
    }
  } catch (error) {
    console.error(
      'Lỗi khi quét phiên âm:',
      error
    );
  } finally {
    isRepairingPronunciations = false;
  }
}

/*
  Trì hoãn việc quét một chút để chờ Firebase
  tải xong toàn bộ dữ liệu.
*/
function schedulePronunciationRepair() {
  if (pronunciationRepairTimer) {
    clearTimeout(
      pronunciationRepairTimer
    );
  }

  pronunciationRepairTimer =
    setTimeout(() => {
      repairMissingPronunciations();
    }, 800);
}

function buildMatchGame(items, direction = 'enToVn') {
  currentMatchSelection = { left: null, right: null };
  matchMessage.textContent = '';
  matchEnglishColumn.innerHTML = '';
  matchVietnameseColumn.innerHTML = '';
  const leftItems = [...items].sort(() => Math.random() - 0.5);
  const rightItems = [...items].sort(() => Math.random() - 0.5);
  const leftType = direction === 'enToVn' ? 'english' : 'vietnamese';
  const rightType = direction === 'enToVn' ? 'vietnamese' : 'english';

  leftItems.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'match-btn';
    btn.textContent = item[leftType];
    btn.dataset.matchId = makeWordId(item);
    btn.addEventListener('click', () => selectMatchOption('left', item, btn));
    matchEnglishColumn.appendChild(btn);
  });
  rightItems.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'match-btn';
    btn.textContent = item[rightType];
    btn.dataset.matchId = makeWordId(item);
    btn.addEventListener('click', () => selectMatchOption('right', item, btn));
    matchVietnameseColumn.appendChild(btn);
  });

  if (matchEnglishColumn.previousElementSibling) {
    matchEnglishColumn.previousElementSibling.textContent = direction === 'enToVn' ? 'Tiếng Anh' : 'Tiếng Việt';
  }
  if (matchVietnameseColumn.previousElementSibling) {
    matchVietnameseColumn.previousElementSibling.textContent = direction === 'enToVn' ? 'Tiếng Việt' : 'Tiếng Anh';
  }
}

function selectMatchOption(side, item, btn) {
  if (btn.disabled) return;
  if (side === 'left') {
    if (currentMatchSelection.left && currentMatchSelection.left.button) {
      currentMatchSelection.left.button.classList.remove('selected');
    }
    currentMatchSelection.left = { item, button: btn };
    btn.classList.add('selected');
  } else {
    if (currentMatchSelection.right && currentMatchSelection.right.button) {
      currentMatchSelection.right.button.classList.remove('selected');
    }
    currentMatchSelection.right = { item, button: btn };
    btn.classList.add('selected');
  }
  if (currentMatchSelection.left && currentMatchSelection.right) {
    checkMatchPair();
  }
}

function checkMatchPair() {
  const leftItem = currentMatchSelection.left.item;
  const rightItem = currentMatchSelection.right.item;
  const leftBtn = currentMatchSelection.left.button;
  const rightBtn = currentMatchSelection.right.button;
  const isMatch = makeWordId(leftItem) === makeWordId(rightItem);

  if (isMatch) {
    leftBtn.classList.add('correct');
    rightBtn.classList.add('correct');
    leftBtn.disabled = true;
    rightBtn.disabled = true;
    matchMessage.textContent = 'Ghép đúng!';
    updateWordStats(leftItem, true);
    score += 1;
    updateScore();
    currentMatchSelection = { left: null, right: null };
    if (document.querySelectorAll('.match-btn:not(:disabled)').length === 0) {
      matchMessage.textContent = 'Hoàn thành! Nhấn Câu tiếp để tiếp tục.';
    }
  } else {
    recordQuizWrong(
  leftItem,
  `${leftBtn.textContent} ↔ ${rightBtn.textContent}`,
  'match'
);
    const activeButtons = Array.from(document.querySelectorAll('.match-btn:not(:disabled)'));
    leftBtn.classList.add('wrong');
    rightBtn.classList.add('wrong');
    matchMessage.textContent = 'Sai rồi, thử lại.';
    updateWordStats(leftItem, false);
    activeButtons.forEach(button => {
      button.disabled = true;
    });
    setTimeout(() => {
      leftBtn.classList.remove('wrong', 'selected');
      rightBtn.classList.remove('wrong', 'selected');
      activeButtons.forEach(button => {
        if (!button.classList.contains('correct')) {
          button.disabled = false;
        }
      });
      currentMatchSelection = { left: null, right: null };
      matchMessage.textContent = '';
    }, 600);
  }
}

function submitTypingAnswer() {
  const value = typingInput.value.trim();

  if (!value) {
    showNotification('⚠️ Vui lòng nhập đáp án.', 2000);
    return;
  }

  const direction = directionSelect.value;
  const isCorrect = isTypingAnswerCorrect(value, currentQuestion);

  updateWordStats(currentQuestion, isCorrect);

  let accepted;

if (direction === 'vnToEn') {
  accepted = getEnglishVariants(currentQuestion).join(', ');
} else {
  accepted = getVietnameseMeaningsForDisplay(currentQuestion).join(', ');
}

  if (isCorrect) {
    score += 1;
    updateScore();

    const correctMessage = direction === 'vnToEn'
      ? `✅ Chính xác! Đáp án: ${currentQuestion.english}`
      : `✅ Chính xác! Đáp án: ${currentQuestion.vietnamese}`;

    questionText.textContent = correctMessage;
    showNotification(correctMessage, 3000);

    playListenWord(currentQuestion.english);
  } else {
    recordQuizWrong(
  currentQuestion,
  value,
  'typing'
);
    const wrongMessage = `❌ Sai! Đáp án đúng: ${accepted}`;

    questionText.textContent = wrongMessage;
    showNotification(wrongMessage, 4000);

    playListenWord(currentQuestion.english);
  }

  typingInput.readOnly = true;
  typingInput.dataset.answered = 'true';
  typingInput.focus();
}

function submitListenAnswer() {
  const value = listenInput.value.trim();

  if (!value) {
    showNotification(
      '⚠️ Vui lòng nhập nội dung bạn nghe được.',
      2000
    );

    return;
  }

  const correctAnswer =
    getListenAnswer(currentQuestion);

  if (!correctAnswer) {
    showNotification(
      '⚠️ Từ này không có câu ví dụ.',
      2500
    );

    return;
  }

  const isExampleMode =
    directionSelect.value === 'example';

  let isCorrect;

if (isExampleMode || directionSelect.value === 'enToEn') {
  // Example và hướng viết tiếng Anh:
  // so sánh toàn bộ câu trả lời.
  isCorrect =
    normalizeListenAnswer(value) ===
    normalizeListenAnswer(correctAnswer);
} else if (directionSelect.value === 'enToVn') {
  // Hướng viết tiếng Việt:
  // chấp nhận bất kỳ nghĩa nào của từ.
  isCorrect = getQuizVietnameseMeanings(
    currentQuestion
  ).some(meaning =>
    normalizeListenAnswer(value) ===
    normalizeListenAnswer(meaning)
  );
} else {
  isCorrect =
    normalizeListenAnswer(value) ===
    normalizeListenAnswer(correctAnswer);
}

 if (isExampleMode) {
  updateExampleStats(
    currentQuestion,
    isCorrect
  );
} else {
  updateWordStats(
    currentQuestion,
    isCorrect
  );
}

  if (isCorrect) {
    score += 1;
    updateScore();

    const correctMessage = isExampleMode
      ? `✅ Chính xác! Câu đầy đủ: ${correctAnswer}`
      : `✅ Chính xác! Từ cần nghe là: ${correctAnswer}`;

    questionText.textContent =
      correctMessage;

    showNotification(
      correctMessage,
      4000
    );
  } else {
    recordQuizWrong(
      currentQuestion,
      value,
      'listen'
    );

    const wrongMessage = isExampleMode
      ? `❌ Sai! Câu đúng là: ${correctAnswer}`
      : `❌ Sai! Đáp án đúng là: ${correctAnswer}`;

    questionText.textContent =
      wrongMessage;

    showNotification(
      wrongMessage,
      5000
    );
  }

  listenInput.readOnly = true;
  listenInput.dataset.answered = 'true';
  listenInput.focus();
}



function hasAnsweredCurrentQuestion() {
  const quizType = quizTypeSelect.value;

  if (quizType === 'multiple') {
    return document.querySelector('.answer-btn:disabled') !== null;
  }

  if (quizType === 'typing') {
    return typingInput.dataset.answered === 'true';
  }

  if (quizType === 'listen') {
    return listenInput.dataset.answered === 'true';
  }

  if (quizType === 'match') {
    return matchMessage.textContent.includes('Hoàn thành');
  }

  return false;
}
function nextQuizQuestion() {
  if (
    questions.length === 0 ||
    quizFinished
  ) {
    return;
  }

  if (!hasAnsweredCurrentQuestion()) {
    showNotification(
      '⚠️ Bạn cần trả lời câu hiện tại trước.',
      2000
    );

    return;
  }

  const isLastQuestion =
    currentIndex >= questions.length - 1;

  if (isLastQuestion) {
    showQuizResults();
    return;
  }

  currentIndex += 1;
  showQuestion();
}

  function addNewWord() {
  const english = newWordEng.value.trim();

  const pendingMeaning = normalizeVietnameseMeaning(
    newWordVn.value
  );

  const allMeanings = [...selectedVietnameseMeanings];

  if (
    pendingMeaning &&
    !allMeanings.some(
      item => normalizeText(item) === normalizeText(pendingMeaning)
    )
  ) {
    allMeanings.push(pendingMeaning);
  }
  
  const vietnamese = allMeanings.join(' | ');
  const pendingTags = normalizeTags(newWordTagsInput.value);
  const combinedTags = [...new Set([...selectedTags, ...pendingTags])];
  const pendingExamples = normalizeExamples(newWordExamplesInput?.value || '');
  const combinedExamples = [...new Set([...selectedExamples, ...pendingExamples])];
  const categorySelection = selectedNewWordCategories.length > 0
    ? [...selectedNewWordCategories]
    : normalizeCategorySelection(newWordCategory.value);
  if (!english || !vietnamese) {
    showNotification('⚠️ Vui lòng nhập đủ cả tiếng Anh và tiếng Việt', 2000);
    return;
  }
  
  const newWord = { 
    english, 
    vietnamese, 
    pronunciation: '',
    category: categorySelection.length > 0 ? categorySelection : [normalizeCategory(newWordCategory.value.trim())],
    tags: combinedTags,
    examples: combinedExamples,
  };
  
  vocab.push(newWord);
  saveVocab();
  populateCategoryOptions();
  renderVocabList();
  renderStats();
  schedulePronunciationRepair();
  newWordEng.value = '';
  resetVietnameseMeanings();
  newWordCategory.value = '';
  newWordTagsInput.value = '';
  if (newWordExamplesInput) {
    newWordExamplesInput.value = '';
  }
  resetTags();
  resetExamples();
  resetNewWordCategories();
  resetLearning();
  showNotification(`✅ Thêm từ "${english}" thành công!`, 2000);
  
    /*
    Lưu khóa của từ để vẫn tìm được từ đó
    sau khi Firebase tải lại danh sách vocab.
  */
  const newWordId = makeWordId(newWord);

  fetchPronunciation(english)
    .then(pronunciation => {
      if (!pronunciation) return;

      /*
        Không sửa trực tiếp biến newWord cũ,
        vì syncFirebase có thể đã tạo lại vocab.
      */
      const savedWord = vocab.find(
        item => makeWordId(item) === newWordId
      );

      if (!savedWord) return;

      savedWord.pronunciation =
        pronunciation;

      saveVocab();
      renderVocabList();
      renderLessonTagList();

      /*
        Nếu từ đang hiển thị trên Flashcard,
        cập nhật lại để hiện phiên âm ngay.
      */
      if (
        currentFlashcard &&
        makeWordId(currentFlashcard) === newWordId
      ) {
        currentFlashcard.pronunciation =
          pronunciation;

        renderFlashcard();
      }
    })
    .catch(error => {
      console.error(
        'Không thể lấy phiên âm cho:',
        english,
        error
      );
    });
}

function openEditModal(item) {
  editingWordIndex = vocab.findIndex(w => makeWordId(w) === makeWordId(item));
  editingWordId = makeWordId(item);
  editWordEng.value = item.english;
  editSelectedVietnameseMeanings =
  getVietnameseMeaningsForDisplay(item);

editWordVn.value = '';
displayEditSelectedMeanings();
  editWordCategory.value = getCategoryDisplay(item);
  editSelectedTags = [...(item.tags || [])];
  displayEditSelectedTags();
  editWordTagsInput.value = '';

refreshEditWordCategoryPanel();
refreshEditWordTagsPanel();

closeFieldPanel(editWordCategoryPanel);
closeFieldPanel(editWordTagsPanel);
  editSelectedExamples =
  normalizeExamples(item.examples);

displayEditSelectedExamples();

if (editWordExamplesInput) {
  editWordExamplesInput.value = '';
}
  
  const stats = wordStats[editingWordId] || { correct: 0, wrong: 0 };
  editWordStats.textContent = `Đúng: ${stats.correct} | Sai: ${stats.wrong}`;
  
  editModal.classList.remove('hidden');
}

function closeEditModalWindow() {
  editModal.classList.add('hidden');

  editingWordIndex = null;
  editingWordId = null;

  resetEditTags();
  resetEditExamples();
  resetEditVietnameseMeanings();
}

function saveEditWordChanges() {
  if (
    editingWordIndex === null ||
    editingWordIndex === -1
  ) {
    return;
  }

  const pendingExample =
  normalizeExampleText(
    editWordExamplesInput?.value || ''
  );

const allExamples = [
  ...editSelectedExamples
];

if (
  pendingExample &&
  !allExamples.some(
    item =>
      normalizeText(item) ===
      normalizeText(pendingExample)
  )
) {
  allExamples.push(pendingExample);
}

  const english = editWordEng.value.trim();

  const pendingMeaning =
    normalizeVietnameseMeaning(editWordVn.value);

  const allMeanings = [
    ...editSelectedVietnameseMeanings
  ];

  if (
    pendingMeaning &&
    !allMeanings.some(
      item =>
        normalizeText(item) ===
        normalizeText(pendingMeaning)
    )
  ) {
    allMeanings.push(pendingMeaning);
  }

  if (!english) {
    showNotification(
      '⚠️ Vui lòng nhập từ tiếng Anh.',
      2500
    );

    editWordEng.focus();
    return;
  }

  if (allMeanings.length === 0) {
    showNotification(
      '⚠️ Từ vựng phải có ít nhất một nghĩa tiếng Việt.',
      2500
    );

    editWordVn.focus();
    return;
  }

  const oldId = editingWordId;

  vocab[editingWordIndex].english = english;

  vocab[editingWordIndex].vietnamese =
    allMeanings.join(' | ');

  vocab[editingWordIndex].category =
    normalizeCategorySelection(
      editWordCategory.value
    );

  vocab[editingWordIndex].tags = [
    ...editSelectedTags
  ];

  vocab[editingWordIndex].examples =
  normalizeExamples(allExamples);

  const newId =
    makeWordId(vocab[editingWordIndex]);

  if (oldId && oldId !== newId) {
    wordStats[newId] =
      wordStats[oldId] ||
      ensureReviewFields({});

    delete wordStats[oldId];
    saveStats();
  }

  saveVocab();
  populateCategoryOptions();
  renderVocabList();
  renderStats();
  closeEditModalWindow();
  resetLearning();
}
 

function addEventListeners() {
  learnModeBtn?.addEventListener(
    'click',
    () => setMode('learn')
  );

  practiceModeBtn?.addEventListener(
  'click',
  () => setMode('practice')
);
  // Mở chế độ Bài học
  lessonModeBtn?.addEventListener(
    'click',
    () => setMode('lesson')
  );

// Thay đổi giọng phát âm
speechAccentSelect?.addEventListener(
  'change',
  () => {

    selectedSpeechAccent =
      speechAccentSelect.value === 'en-GB'
        ? 'en-GB'
        : 'en-US';

    // Lưu lựa chọn vào trình duyệt
    localStorage.setItem(
      'openquizSpeechAccent',
      selectedSpeechAccent
    );

    const accentName =
      selectedSpeechAccent === 'en-GB'
        ? 'Anh-Anh'
        : 'Anh-Mỹ';

    showNotification(
      `Đã chuyển sang giọng ${accentName}.`,
      1800
    );

  }
);


  // Tìm kiếm tag trong Bài học
  lessonTagSearch?.addEventListener(
    'input',
    renderLessonTagList
  );


runPracticeBtn?.addEventListener(
  'click',
  loadPracticeFromCode
);


clearPracticeCodeBtn?.addEventListener(
  'click',
  clearPracticeCode
);


checkAllPracticeBtn?.addEventListener(
  'click',
  checkAllPracticeQuestions
);


resetPracticeBtn?.addEventListener(
  'click',
  resetPracticeLesson
);

  /*
    Bấm thanh số ngày để mở hoặc đóng bảng nhỏ.
  */
  studyDaysBtn?.addEventListener(
    'click',
    event => {
      event.stopPropagation();

      const shouldOpen =
        studyDaysPanel?.classList.contains(
          'hidden'
        );

      setStudyDaysPanelOpen(
        Boolean(shouldOpen)
      );
    }
  );

  /*
    Nhấn nút điểm danh.
  */
  studyAttendanceBtn?.addEventListener(
    'click',
    event => {
      event.stopPropagation();
      checkInStudyToday();
    }
  );

  quizModeBtn?.addEventListener(
    'click',
    () => setMode('quiz')
  );

  darkModeToggle?.addEventListener(
    'click',
    toggleDarkMode
  );
  
  categorySelectToggle?.addEventListener('click', () => {
    setCategoryPanelOpen(categorySelectPanel?.classList.contains('hidden'));
  });
  tagSelectToggle?.addEventListener('click', () => {
    setTagPanelOpen(tagSelect?.classList.contains('hidden'));
  });
  clearTagSelectionBtn?.addEventListener('click', () => {
    setSelectedTags([]);
    resetLearning();
    if (!quizPanel.classList.contains('hidden')) startQuiz();
  });
  reviewModeSelect?.addEventListener('change', () => {
    resetLearning();
    if (!quizPanel.classList.contains('hidden')) startQuiz();
  });
  directionSelect?.addEventListener('change', () => {
    if (!quizPanel.classList.contains('hidden')) startQuiz();
  });
  quizCountSelect?.addEventListener('change', () => {
    if (!quizPanel.classList.contains('hidden')) startQuiz();
  });
  quizCountSelect?.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    quizCountSelect.blur();

    if (!quizPanel.classList.contains('hidden')) {
      startQuiz();
    }
  }
});
  
  searchInput?.addEventListener('input', renderVocabList);
  searchInput?.addEventListener('change', renderVocabList);
  searchInput?.addEventListener('search', renderVocabList);
  searchInput?.addEventListener('compositionend', renderVocabList);
  clearSearchBtn?.addEventListener('click', () => {
  searchInput.value = '';
  renderVocabList();
  searchInput.focus();
});
  quizTypeSelect?.addEventListener('change', () => {
  updateDirectionOptions();

  /*
    Khi đổi loại trò chơi:
    - nếu đang ở Quiz thì tạo lại trò chơi;
    - nếu đang ở Flashcard thì chỉ cập nhật lựa chọn.
  */
  if (!quizPanel.classList.contains('hidden')) {
    startQuiz();
  }
});
  flipBtn?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    renderFlashcard();
  });
  flashSpeakBtn?.addEventListener('click', () => {
    if (currentFlashcard) {
      playListenWord(currentFlashcard.english);
    }
  });

  prevBtn?.addEventListener('click', () => changeCard(-1));
  nextBtn?.addEventListener('click', () => changeCard(1));
  submitTyping?.addEventListener('click', submitTypingAnswer);
  listenButton?.addEventListener('click', () => {
  const textToSpeak =
  getListenSpeechText(currentQuestion);

  if (!textToSpeak) {
    showNotification(
      'Từ này không có câu ví dụ.',
      2500
    );

    return;
  }

  playListenWord(textToSpeak);
});
  submitListen?.addEventListener('click', submitListenAnswer);
  nextQuizBtn?.addEventListener('click', nextQuizQuestion);
   restartBtn?.addEventListener('click', startQuiz);
   
   
   
  document.addEventListener('keydown', event => {
    const isEnter = event.key === 'Enter';
    const isSpace = event.code === 'Space';

    if (!isEnter && !isSpace) return;

    // Chỉ hoạt động khi đang mở Quiz
    if (quizPanel.classList.contains('hidden')) return;

    const activeElement = document.activeElement;

    const isTypingAnswer =
      activeElement === typingInput ||
      activeElement === listenInput;

    // Khi vẫn đang nhập đáp án thì không chuyển câu
    if (isTypingAnswer && !activeElement.readOnly) {
      return;
    }

    // Chỉ chuyển sau khi đã trả lời
    if (!hasAnsweredCurrentQuestion()) {
      return;
    }

    event.preventDefault();
    nextQuizQuestion();
  });

  newWordCategory?.addEventListener('focus', () => {
    refreshNewWordCategoryPanel();
    openFieldPanel(newWordCategoryPanel);
  });
  newWordCategory?.addEventListener('click', () => {
    refreshNewWordCategoryPanel();
    openFieldPanel(newWordCategoryPanel);
  });
  newWordCategory?.addEventListener('input', () => {
    refreshNewWordCategoryPanel();
    openFieldPanel(newWordCategoryPanel);
  });
  newWordEng?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    focusNewWordField(newWordVn, null);
  });
   newWordVn?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  event.stopPropagation();
  const pendingMeaning = newWordVn.value.trim();

  // Có nội dung thì thêm một nghĩa mới
  if (pendingMeaning) {
    addVietnameseMeaning(pendingMeaning);
    return;
  }

  // Ô trống và đã có ít nhất một nghĩa:
  // chuyển sang phần Loại từ
  if (selectedVietnameseMeanings.length > 0) {
    focusNewWordField(
      newWordCategory,
      newWordCategoryPanel,
      refreshNewWordCategoryPanel
    );
  }
});
   newWordCategory?.addEventListener(
    'keydown',
    event => {
      if (event.key !== 'Enter') return;

      event.preventDefault();
      event.stopPropagation();

      const categoryText =
        newWordCategory.value.trim();

      if (!categoryText) return;

      addNewWordCategory(categoryText);
    }
  );

  newWordTagsInput?.addEventListener('focus', () => {
    refreshNewWordTagsPanel();
    openFieldPanel(newWordTagsPanel);
  });
  newWordTagsInput?.addEventListener('click', () => {
    refreshNewWordTagsPanel();
    openFieldPanel(newWordTagsPanel);
  });
  newWordTagsInput?.addEventListener('input', () => {
    refreshNewWordTagsPanel();
    openFieldPanel(newWordTagsPanel);
  });
  newWordExamplesInput?.addEventListener('focus', () => {
    refreshNewWordExamplesPanel();
    openFieldPanel(newWordExamplesPanel);
  });
  newWordExamplesInput?.addEventListener('click', () => {
    refreshNewWordExamplesPanel();
    openFieldPanel(newWordExamplesPanel);
  });
  newWordExamplesInput?.addEventListener('input', () => {
    refreshNewWordExamplesPanel();
    openFieldPanel(newWordExamplesPanel);
  });
  
  // Tag input listeners
  addTagBtn?.addEventListener('click', () => {
    if (newWordTagsInput.value.trim()) {
      addTag(newWordTagsInput.value.trim());
    }
  });
  
  newWordTagsInput?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (newWordTagsInput.value.trim()) {
      addTag(newWordTagsInput.value.trim());
    }
  });

  newWordExamplesInput?.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (newWordExamplesInput.value.trim()) {
      addExample(newWordExamplesInput.value.trim());
    }
  });
  
  addWordBtn?.addEventListener('click', addNewWord);
  exportBtn?.addEventListener('click', exportData);
  importBtn?.addEventListener('click', () => importFileInput?.click());
  importFileInput?.addEventListener('change', event => {
    const file = event.target.files?.[0];
    if (file) importData(file);
    if (importFileInput) importFileInput.value = '';
  });
    /*
    Bấm bên ngoài khu vực điểm danh thì đóng bảng.
  */
  document.addEventListener(
    'click',
    event => {
      if (
        !studyDaysWrapper ||
        !studyDaysPanel
      ) {
        return;
      }

      if (
        studyDaysPanel.classList.contains(
          'hidden'
        )
      ) {
        return;
      }

      const clickedInside =
        studyDaysWrapper.contains(
          event.target
        );

      if (!clickedInside) {
        setStudyDaysPanelOpen(false);
      }
    }
  );
  // Device modal events
  deviceToggleBtn?.addEventListener('click', showDeviceModal);
  deviceMobileBtn?.addEventListener('click', () => { applyDevice('mobile'); closeDeviceModalWindow(); });
  deviceDesktopBtn?.addEventListener('click', () => { applyDevice('desktop'); closeDeviceModalWindow(); });
  closeDeviceModal?.addEventListener('click', closeDeviceModalWindow);
  deviceModal?.addEventListener('click', event => { if (event.target === deviceModal) closeDeviceModalWindow(); });
    resetWordStatsCheckbox?.addEventListener(
    'change',
    updateResetStatsConfirmButton
  );

  resetExampleStatsCheckbox?.addEventListener(
    'change',
    updateResetStatsConfirmButton
  );

  confirmResetStatsBtn?.addEventListener(
    'click',
    confirmResetSelectedStats
  );

  cancelResetStatsBtn?.addEventListener(
    'click',
    closeResetStatsModal
  );

  closeResetStatsModalBtn?.addEventListener(
    'click',
    closeResetStatsModal
  );

  resetStatsModal?.addEventListener(
    'click',
    event => {
      if (event.target === resetStatsModal) {
        closeResetStatsModal();
      }
    }
  );
  document.addEventListener('click', event => {
    if (!categorySelectPanel || !categorySelectToggle) return;
    if (categorySelectPanel.classList.contains('hidden')) return;
    const clickedInside = categorySelectPanel.contains(event.target) || categorySelectToggle.contains(event.target);
    if (!clickedInside) {
      setCategoryPanelOpen(false);
    }
  });
  document.addEventListener('click', event => {
    if (!tagSelect || !tagSelectToggle) return;
    if (tagSelect.classList.contains('hidden')) return;
    const clickedInside = tagSelect.contains(event.target) || tagSelectToggle.contains(event.target);
    if (!clickedInside) {
      setTagPanelOpen(false);
    }
  });
  document.addEventListener('click', event => {
  const clickedEditCategory =
    editWordCategoryPanel?.contains(event.target) ||
    editWordCategory?.contains(event.target);

  const clickedEditTags =
    editWordTagsPanel?.contains(event.target) ||
    editWordTagsInput?.contains(event.target);

  if (!clickedEditCategory) {
    closeFieldPanel(editWordCategoryPanel);
  }

  if (!clickedEditTags) {
    closeFieldPanel(editWordTagsPanel);
  }
});
  document.addEventListener('click', event => {
    const clickedCategory = newWordCategoryPanel?.contains(event.target) || newWordCategory?.contains(event.target);
    const clickedTags = newWordTagsPanel?.contains(event.target) || newWordTagsInput?.contains(event.target);
    const clickedExamples = newWordExamplesPanel?.contains(event.target) || newWordExamplesInput?.contains(event.target);
    if (!clickedCategory) {
      closeFieldPanel(newWordCategoryPanel);
    }
    if (!clickedTags) {
      closeFieldPanel(newWordTagsPanel);
    }
    if (!clickedExamples) {
      closeFieldPanel(newWordExamplesPanel);
    }
  });
  document.addEventListener('click', event => {
  const clickedEditCategory =
    editWordCategoryPanel?.contains(event.target) ||
    editWordCategory?.contains(event.target);

  const clickedEditTags =
    editWordTagsPanel?.contains(event.target) ||
    editWordTagsInput?.contains(event.target);

  if (!clickedEditCategory) {
    closeFieldPanel(editWordCategoryPanel);
  }

  if (!clickedEditTags) {
    closeFieldPanel(editWordTagsPanel);
  }
});
  
  // Modal events
  // Gợi ý loại từ trong modal chi tiết
editWordCategory?.addEventListener('focus', () => {
  refreshEditWordCategoryPanel();
  openFieldPanel(editWordCategoryPanel);
});

editWordCategory?.addEventListener('click', () => {
  refreshEditWordCategoryPanel();
  openFieldPanel(editWordCategoryPanel);
});

editWordCategory?.addEventListener('input', () => {
  refreshEditWordCategoryPanel();
  openFieldPanel(editWordCategoryPanel);
});

// Gợi ý tag trong modal chi tiết
editWordTagsInput?.addEventListener('focus', () => {
  refreshEditWordTagsPanel();
  openFieldPanel(editWordTagsPanel);
});

editWordTagsInput?.addEventListener('click', () => {
  refreshEditWordTagsPanel();
  openFieldPanel(editWordTagsPanel);
});

editWordTagsInput?.addEventListener('input', () => {
  refreshEditWordTagsPanel();
  openFieldPanel(editWordTagsPanel);
});
  closeEditModal.addEventListener('click', closeEditModalWindow);
  cancelEditWord.addEventListener('click', closeEditModalWindow);
  
  editWordVn?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;

  event.preventDefault();
  event.stopPropagation();

  const pendingMeaning = editWordVn.value.trim();

  if (pendingMeaning) {
    addEditVietnameseMeaning(pendingMeaning);
    return;
  }

  if (editSelectedVietnameseMeanings.length > 0) {
    editWordCategory.focus();
  }
});

editWordExamplesInput?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;

  event.preventDefault();
  event.stopPropagation();

  const pendingExample =
    editWordExamplesInput.value.trim();

  if (pendingExample) {
    addEditExample(pendingExample);
  }
});

  // Edit tag input listeners
  editAddTagBtn?.addEventListener('click', () => {
    if (editWordTagsInput.value.trim()) {
      addEditTag(editWordTagsInput.value.trim());
    }
  });
  
  editWordTagsInput?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;

  event.preventDefault();
  event.stopPropagation();

  const tag = editWordTagsInput.value.trim();

  if (tag) {
    addEditTag(tag);
    refreshEditWordTagsPanel();
    openFieldPanel(editWordTagsPanel);
  }
});
 
  saveEditWord.addEventListener('click', saveEditWordChanges);
  editModal.addEventListener('click', event => {
    if (event.target === editModal) closeEditModalWindow();
  });
  
 typingInput.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;

  event.preventDefault();
  event.stopPropagation();

  if (typingInput.dataset.answered === 'true') {
    nextQuizQuestion();
  } else {
    submitTypingAnswer();
  }
});

listenInput.addEventListener('keydown', event => {
  /*
    Khi ô chưa có chữ, nhấn Space để nghe lại.
  */
  if (
    event.code === 'Space' &&
    listenInput.value.trim() === '' &&
    listenInput.dataset.answered !== 'true'
  ) {
    event.preventDefault();
    event.stopPropagation();

    /*
      Tránh phát âm thanh liên tục khi giữ phím Space.
    */
   if (!event.repeat) {
  const textToSpeak =
  getListenSpeechText(currentQuestion);

  if (textToSpeak) {
    playListenWord(textToSpeak);
  }
}

    return;
  }

  /*
    Enter vẫn dùng để nộp đáp án hoặc sang câu tiếp theo.
  */
  if (event.key !== 'Enter') return;

  event.preventDefault();
  event.stopPropagation();

  if (listenInput.dataset.answered === 'true') {
    nextQuizQuestion();
  } else {
    submitListenAnswer();
  }
});

}
function init() {
  initDarkMode();
  initDevicePreference();

  // Khôi phục giọng đã chọn
  initSpeechAccent();

  /*
    Đọc dữ liệu local trước để giao diện
    có dữ liệu ngay cả khi mất mạng.
  */
  loadVocab();

  initStudyAttendance();

  populateCategoryOptions();
  renderVocabList();
  renderStats();

  /*
    Sau đó kết nối Firebase.
    Khi Firebase trả dữ liệu về,
    các listener sẽ tự cập nhật giao diện.
  */
  

  schedulePronunciationRepair();
  setMode("learn");
  updateDirectionOptions();
  addEventListeners();
}

init();


function updateFirebaseAccountUI(user) {
  if (
    !firebaseLoginBtn ||
    !firebaseUserStatus ||
    !firebaseUserStatusText
  ) {
    return;
  }

  if (user) {
    firebaseLoginBtn.textContent =
      "🚪 Đăng xuất";

    firebaseLoginBtn.classList.add(
      "logged-in"
    );

    firebaseLoginBtn.setAttribute(
      "aria-pressed",
      "true"
    );

    firebaseLoginBtn.title =
      "Nhấn để đăng xuất";

    firebaseUserStatus.classList.remove(
      "signed-out"
    );

    firebaseUserStatus.classList.add(
      "signed-in"
    );

    firebaseUserStatusText.textContent =
      user.email ||
      user.displayName ||
      "Đã đăng nhập";

    firebaseUserStatus.title =
      `Đã đăng nhập: ${
        user.email ||
        user.displayName ||
        "Tài khoản Google"
      }`;

    return;
  }

  firebaseLoginBtn.textContent =
    "🔐 Đăng nhập Google";

  firebaseLoginBtn.classList.remove(
    "logged-in"
  );

  firebaseLoginBtn.setAttribute(
    "aria-pressed",
    "false"
  );

  firebaseLoginBtn.title =
    "Nhấn để đăng nhập Google";

  firebaseUserStatus.classList.remove(
    "signed-in"
  );

  firebaseUserStatus.classList.add(
    "signed-out"
  );

  firebaseUserStatusText.textContent =
    "Chưa đăng nhập";

  firebaseUserStatus.title =
    "Bạn chưa đăng nhập";
}

firebaseLoginBtn?.addEventListener(
  "click",
  async () => {
    try {
      if (auth.currentUser) {
        const confirmed = confirm(
          `Bạn đang đăng nhập bằng:\n` +
          `${auth.currentUser.email || "Tài khoản Google"}\n\n` +
          "Bạn có muốn đăng xuất không?"
        );

        if (!confirmed) {
          return;
        }

        await signOut(auth);

        showNotification(
          "✅ Đã đăng xuất."
        );

        return;
      }

      await signInWithPopup(
        auth,
        googleProvider
      );
    } catch (error) {
      console.error(
        "Lỗi tài khoản Google:",
        error
      );

      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        showNotification(
          "Bạn đã đóng cửa sổ đăng nhập."
        );

        return;
      }

      showNotification(
        `❌ ${
          error.code ||
          "Không thể đăng nhập Google"
        }`
      );
    }
  }
);

onAuthStateChanged(
  auth,
  user => {
    updateFirebaseAccountUI(user);

    if (user) {
      showNotification(
        `✅ Đang đăng nhập: ${
          user.email ||
          user.displayName ||
          "Tài khoản Google"
        }`
      );

      if (!firebaseSyncStarted) {
        firebaseSyncStarted = true;
        syncFirebase();
      }
    }
  },
  error => {
    console.error(
      "Không thể kiểm tra trạng thái đăng nhập:",
      error
    );

    updateFirebaseAccountUI(null);
  }
);