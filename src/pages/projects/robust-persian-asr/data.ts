import type { ShowcaseProject } from '../types'

export const repository = 'https://github.com/pooya79/MS-Thesis'
export const resultsArchive = `${repository}/tree/main/report`

export const robustPersianAsr: ShowcaseProject = {
  slug: 'robust-persian-asr',
  title: 'Robust Persian ASR',
  description: 'My MS thesis on robust Persian speech recognition with Whisper Small and Medium, multi-condition training, and dual-view fusion.',
  category: 'Research', motif: 'leaf',
  tags: ['Speech AI', 'MS Thesis', 'PyTorch'], filters: ['AI', 'Research'],
  image: 'asr', imagePosition: '65% 52%',
  introduction: 'Adapting Whisper Small and Medium to Persian speech through multi-condition training, realistic telephone degradations, and additional pseudo-labeled speech.',
  details: [],
}

// Main research runs from report/{whisper,whisper-deg,whisper-medium,whisper-iranseda,whisper-fusion-compact}/metrics.json.
// Cross-checked against Thesis/chapters/results.tex. Scores are percentages.
export const evaluationSets = [
  {
    "id": "aggregate",
    "name": "All five test sets"
  },
  {
    "id": "agfarsdat",
    "name": "AGFarsdat · telephone / VoIP"
  },
  {
    "id": "cv25",
    "name": "Common Voice 25"
  },
  {
    "id": "fleurs",
    "name": "FLEURS Persian"
  },
  {
    "id": "persianSpeech",
    "name": "PersianSpeech"
  },
  {
    "id": "speechCorpus",
    "name": "Persian Speech Corpus"
  }
] as const
export type EvaluationSet = typeof evaluationSets[number]['id']

export const methods = [
  {
    "name": "Whisper Small · standard training",
    "source": "whisper/metrics.json",
    "scores": {
      "aggregate": {
        "wer": 23.27,
        "cer": 10.84,
        "examples": 21848
      },
      "agfarsdat": {
        "wer": 35.63,
        "cer": 19.73,
        "examples": 10044
      },
      "cv25": {
        "wer": 11.52,
        "cer": 4.06,
        "examples": 10518
      },
      "fleurs": {
        "wer": 21.05,
        "cer": 6.13,
        "examples": 871
      },
      "persianSpeech": {
        "wer": 34.53,
        "cer": 16.21,
        "examples": 24
      },
      "speechCorpus": {
        "wer": 30.17,
        "cer": 15.48,
        "examples": 391
      }
    }
  },
  {
    "name": "Whisper Small · multi-condition",
    "source": "whisper-deg/metrics.json",
    "scores": {
      "aggregate": {
        "wer": 17.83,
        "cer": 7.93,
        "examples": 21848
      },
      "agfarsdat": {
        "wer": 25.8,
        "cer": 12.62,
        "examples": 10044
      },
      "cv25": {
        "wer": 7.84,
        "cer": 3.22,
        "examples": 10518
      },
      "fleurs": {
        "wer": 19.82,
        "cer": 6.36,
        "examples": 871
      },
      "persianSpeech": {
        "wer": 35.25,
        "cer": 15.62,
        "examples": 24
      },
      "speechCorpus": {
        "wer": 30.9,
        "cer": 15.22,
        "examples": 391
      }
    }
  },
  {
    "name": "Whisper Medium",
    "source": "whisper-medium/metrics.json",
    "scores": {
      "aggregate": {
        "wer": 14.36,
        "cer": 6.68,
        "examples": 21848
      },
      "agfarsdat": {
        "wer": 21.99,
        "cer": 10.92,
        "examples": 10044
      },
      "cv25": {
        "wer": 3.84,
        "cer": 1.65,
        "examples": 10518
      },
      "fleurs": {
        "wer": 17.14,
        "cer": 5.42,
        "examples": 871
      },
      "persianSpeech": {
        "wer": 31.65,
        "cer": 13.99,
        "examples": 24
      },
      "speechCorpus": {
        "wer": 31.17,
        "cer": 17.29,
        "examples": 391
      }
    }
  },
  {
    "name": "Whisper Small · multi-condition + IranSeda",
    "source": "whisper-iranseda/metrics.json",
    "scores": {
      "aggregate": {
        "wer": 17.22,
        "cer": 7.7,
        "examples": 21848
      },
      "agfarsdat": {
        "wer": 26.66,
        "cer": 12.96,
        "examples": 10044
      },
      "cv25": {
        "wer": 8.19,
        "cer": 3.29,
        "examples": 10518
      },
      "fleurs": {
        "wer": 13.78,
        "cer": 4.09,
        "examples": 871
      },
      "persianSpeech": {
        "wer": 26.86,
        "cer": 9.82,
        "examples": 24
      },
      "speechCorpus": {
        "wer": 25.87,
        "cer": 14.16,
        "examples": 391
      }
    }
  },
  {
    "name": "Whisper Small · dual-view fusion (unreleased)",
    "source": "whisper-fusion-compact/metrics.json",
    "scores": {
      "aggregate": {
        "wer": 17.64,
        "cer": 7.85,
        "examples": 21854
      },
      "agfarsdat": {
        "wer": 25.37,
        "cer": 12.39,
        "examples": 10044
      },
      "cv25": {
        "wer": 7.53,
        "cer": 3.13,
        "examples": 10519
      },
      "fleurs": {
        "wer": 19.67,
        "cer": 6.29,
        "examples": 871
      },
      "persianSpeech": {
        "wer": 31.81,
        "cer": 12.95,
        "examples": 24
      },
      "speechCorpus": {
        "wer": 33.82,
        "cer": 19.95,
        "examples": 396
      }
    }
  }
]

export const models = [
  { name: 'Whisper Small', id: 'Pooya-Fallah/whisper-small-fa', description: 'Persian fine-tuned checkpoint', href: 'https://huggingface.co/Pooya-Fallah/whisper-small-fa' },
  { name: 'Whisper Medium', id: 'Pooya-Fallah/whisper-medium-fa', description: 'Persian fine-tuned checkpoint', href: 'https://huggingface.co/Pooya-Fallah/whisper-medium-fa' },
]
