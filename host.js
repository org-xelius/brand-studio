// index.js
import { randomUUID as randomUUID2 } from "node:crypto";
import { z } from "zod";

// image-errors.js
var CODES = /* @__PURE__ */ new Set(["unknown_parameter", "unsupported_parameter", "unsupported_value", "invalid_value", "invalid_model", "model_not_found", "billing_hard_limit_reached", "billing_not_active", "insufficient_quota", "rate_limit_exceeded", "invalid_api_key", "organization_restricted", "organization_verification_required", "permission_denied", "moderation_blocked", "content_policy_violation", "image_generation_user_error", "invalid_request_error"]);
var TYPES = /* @__PURE__ */ new Set(["invalid_request_error", "permissions_error", "permission_error", "rate_limit_error", "server_error", "authentication_error", "insufficient_quota"]);
var PARAMS = /* @__PURE__ */ new Set(["model", "prompt", "n", "size", "quality", "output_format", "stream", "moderation", "output_compression", "partial_images", "input_fidelity", "response_format", "image", "mask", "user", "background"]);
async function readError(response) {
  const reader = response.body?.getReader();
  if (!reader) return {};
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.length;
      if (size > 65536) {
        await reader.cancel();
        return {};
      }
      chunks.push(part.value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"))?.error || {};
  } catch {
    return {};
  } finally {
    reader.releaseLock();
  }
}
async function imageFailure(response) {
  const raw = await readError(response), status = response.status;
  const message = typeof raw.message === "string" ? raw.message : "";
  let code = CODES.has(raw.code) ? raw.code : void 0;
  if (/organi[sz]ation.{0,100}(verif|verified)|verif.{0,100}organi[sz]ation/i.test(message)) code = "organization_verification_required";
  else if (!code && /billing.{0,40}(limit|active|hard)|hard.{0,20}limit/i.test(message)) code = "billing_hard_limit_reached";
  const type = TYPES.has(raw.type) ? raw.type : void 0;
  const param = PARAMS.has(raw.param) ? raw.param : void 0;
  const header = response.headers.get("x-request-id");
  const requestId = typeof header === "string" && /^req_[A-Za-z0-9_-]{1,160}$/.test(header) ? header : void 0;
  let error;
  if (status >= 500 || status === 408) error = "OpenAI did not confirm the outcome. This request may have been charged. Check OpenAI usage before trying again.";
  else if (code === "organization_verification_required") error = "OpenAI requires organisation verification for this image model. Complete verification for the API key\u2019s organisation in OpenAI settings, then try a new confirmed request. No automatic retry was made.";
  else if (param === "model" && ["unknown_parameter", "unsupported_parameter", "unsupported_value", "invalid_value"].includes(code)) error = "OpenAI rejected the configured image model. Open Image setup, check available models, and save a supported image model before submitting a new confirmed request.";
  else if (["unknown_parameter", "unsupported_parameter", "unsupported_value", "invalid_value"].includes(code) && param) error = `OpenAI rejected the image request parameter \u201C${param}\u201D (${code}). This is an integration/settings issue; changing your brief alone may not fix it. No automatic retry was made.`;
  else if (code === "model_not_found" || code === "invalid_model") error = "OpenAI could not use the configured image model. Check that this API project has access to it. No automatic retry was made.";
  else if (["insufficient_quota", "billing_hard_limit_reached", "billing_not_active"].includes(code)) error = "OpenAI declined the image request because API billing or available quota is insufficient. Check the API project\u2019s billing and limits; chat subscriptions do not provide API credits.";
  else if (code === "moderation_blocked" || code === "content_policy_violation") error = "OpenAI rejected the request under its image safety rules. Review the brief before submitting a new request.";
  else if (status === 401 || status === 403 || code === "invalid_api_key") error = "OpenAI rejected the key or account permissions. Check the image API key, project permissions, and model access.";
  else if (status === 429) error = "OpenAI declined the request because of a rate limit or account quota. Check the API project\u2019s usage and billing before retrying.";
  else error = `OpenAI declined this image request (HTTP ${status}${code ? `, ${code}` : ""}${param ? `, parameter ${param}` : ""}). No automatic retry was made. Review the model, inputs, and account access.`;
  return { httpStatus: status, error, ...code ? { providerCode: code } : {}, ...type ? { providerType: type } : {}, ...param ? { providerParam: param } : {}, ...requestId ? { providerRequestId: requestId } : {} };
}

// model.js
import { randomUUID } from "node:crypto";

// src/layout-kernel-flex.js
var LAYOUT_GEOMETRY = {
  "lateral": {
    "square": {
      "title": [
        64,
        240,
        480,
        270
      ],
      "body": [
        64,
        550,
        480,
        170
      ],
      "visual": [
        600,
        180,
        416,
        590
      ],
      "cta": [
        64,
        240,
        480,
        775
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        600,
        782,
        416,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          64,
          240,
          480,
          775
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        64,
        310,
        480,
        340
      ],
      "body": [
        64,
        700,
        480,
        190
      ],
      "visual": [
        600,
        230,
        416,
        790
      ],
      "cta": [
        64,
        310,
        480,
        980
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        600,
        1032,
        416,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          64,
          310,
          480,
          980
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        80,
        400,
        490,
        450
      ],
      "body": [
        80,
        920,
        490,
        250
      ],
      "visual": [
        620,
        420,
        380,
        920
      ],
      "cta": [
        80,
        400,
        490,
        1380
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        620,
        1352,
        380,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          80,
          400,
          490,
          1380
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "landscape": {
      "title": [
        52,
        150,
        470,
        180
      ],
      "body": [
        52,
        350,
        470,
        80
      ],
      "visual": [
        610,
        110,
        420,
        350
      ],
      "cta": [
        52,
        150,
        470,
        375
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        610,
        472,
        420,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "copyFlow": {
        "box": [
          52,
          150,
          470,
          375
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 28
      }
    }
  },
  "broadside": {
    "square": {
      "title": [
        64,
        180,
        952,
        250
      ],
      "body": [
        64,
        465,
        790,
        115
      ],
      "visual": [
        64,
        640,
        440,
        360
      ],
      "cta": [
        564,
        760,
        452,
        210
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        1012,
        440,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "portrait": {
      "title": [
        64,
        210,
        952,
        320
      ],
      "body": [
        64,
        565,
        790,
        140
      ],
      "visual": [
        64,
        810,
        480,
        450
      ],
      "cta": [
        610,
        1040,
        406,
        210
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        1272,
        480,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "story": {
      "title": [
        80,
        290,
        920,
        420
      ],
      "body": [
        80,
        760,
        840,
        200
      ],
      "visual": [
        80,
        1150,
        480,
        530
      ],
      "cta": [
        620,
        1430,
        380,
        240
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1692,
        480,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "landscape": {
      "title": [
        52,
        125,
        976,
        150
      ],
      "body": [
        52,
        300,
        780,
        70
      ],
      "visual": [
        52,
        390,
        440,
        125
      ],
      "cta": [
        600,
        410,
        428,
        95
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        52,
        527,
        440,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left"
    }
  },
  "specimen": {
    "square": {
      "title": [
        64,
        710,
        590,
        180
      ],
      "body": [
        64,
        925,
        590,
        100
      ],
      "visual": [
        170,
        280,
        740,
        360
      ],
      "cta": [
        620,
        120,
        396,
        140
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        170,
        652,
        740,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "portrait": {
      "title": [
        64,
        930,
        590,
        230
      ],
      "body": [
        64,
        1190,
        590,
        105
      ],
      "visual": [
        130,
        340,
        820,
        500
      ],
      "cta": [
        620,
        135,
        396,
        160
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        130,
        852,
        820,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "story": {
      "title": [
        80,
        1310,
        610,
        280
      ],
      "body": [
        80,
        1630,
        610,
        150
      ],
      "visual": [
        100,
        480,
        880,
        700
      ],
      "cta": [
        600,
        230,
        400,
        190
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        100,
        1192,
        880,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "landscape": {
      "title": [
        52,
        365,
        570,
        100
      ],
      "body": [
        52,
        480,
        570,
        48
      ],
      "visual": [
        210,
        145,
        570,
        190
      ],
      "cta": [
        690,
        80,
        338,
        90
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        210,
        347,
        570,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left"
    }
  },
  "centered": {
    "square": {
      "title": [
        160,
        300,
        760,
        240
      ],
      "body": [
        210,
        580,
        660,
        130
      ],
      "visual": [
        780,
        140,
        236,
        125
      ],
      "cta": [
        250,
        300,
        580,
        715
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        780,
        277,
        236,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "copyFlow": {
        "box": [
          160,
          300,
          760,
          715
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        130,
        400,
        820,
        300
      ],
      "body": [
        210,
        755,
        660,
        170
      ],
      "visual": [
        760,
        160,
        256,
        190
      ],
      "cta": [
        250,
        400,
        580,
        890
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        760,
        362,
        256,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "copyFlow": {
        "box": [
          130,
          400,
          820,
          890
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        120,
        600,
        840,
        380
      ],
      "body": [
        190,
        1050,
        700,
        220
      ],
      "visual": [
        780,
        250,
        220,
        260
      ],
      "cta": [
        230,
        600,
        620,
        1180
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        780,
        522,
        220,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "copyFlow": {
        "box": [
          120,
          600,
          840,
          1180
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "landscape": {
      "title": [
        180,
        185,
        720,
        140
      ],
      "body": [
        250,
        350,
        580,
        65
      ],
      "visual": [
        850,
        100,
        178,
        70
      ],
      "cta": [
        310,
        185,
        460,
        340
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        850,
        182,
        178,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "center",
      "copyFlow": {
        "box": [
          180,
          185,
          720,
          340
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 28
      }
    }
  },
  "spread": {
    "square": {
      "title": [
        600,
        225,
        416,
        270
      ],
      "body": [
        600,
        535,
        416,
        180
      ],
      "visual": [
        64,
        340,
        470,
        610
      ],
      "cta": [
        600,
        225,
        416,
        790
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        962,
        470,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          600,
          225,
          416,
          790
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        600,
        290,
        416,
        330
      ],
      "body": [
        600,
        670,
        416,
        210
      ],
      "visual": [
        64,
        450,
        470,
        770
      ],
      "cta": [
        600,
        290,
        416,
        1e3
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        1232,
        470,
        36
      ],
      "headlineSize": 64,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          600,
          290,
          416,
          1e3
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        580,
        410,
        420,
        410
      ],
      "body": [
        580,
        890,
        420,
        270
      ],
      "visual": [
        80,
        680,
        430,
        1020
      ],
      "cta": [
        580,
        410,
        420,
        1370
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1712,
        430,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "copyFlow": {
        "box": [
          580,
          410,
          420,
          1370
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "landscape": {
      "title": [
        610,
        125,
        418,
        180
      ],
      "body": [
        610,
        335,
        418,
        80
      ],
      "visual": [
        52,
        185,
        490,
        330
      ],
      "cta": [
        610,
        125,
        418,
        400
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        52,
        527,
        490,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "copyFlow": {
        "box": [
          610,
          125,
          418,
          400
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 28
      }
    }
  },
  "cover": {
    "square": {
      "title": [
        64,
        710,
        540,
        180
      ],
      "body": [
        64,
        925,
        540,
        100
      ],
      "visual": [
        64,
        180,
        952,
        450
      ],
      "cta": [
        650,
        795,
        366,
        175
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        642,
        952,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "portrait": {
      "title": [
        64,
        950,
        550,
        220
      ],
      "body": [
        64,
        1205,
        550,
        90
      ],
      "visual": [
        64,
        190,
        952,
        660
      ],
      "cta": [
        660,
        1070,
        356,
        180
      ],
      "brand": [
        64,
        56,
        430,
        64
      ],
      "kicker": [
        680,
        56,
        336,
        60
      ],
      "annotation": [
        64,
        862,
        952,
        36
      ],
      "headlineSize": 72,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "story": {
      "title": [
        80,
        1330,
        540,
        280
      ],
      "body": [
        80,
        1660,
        540,
        120
      ],
      "visual": [
        80,
        270,
        920,
        940
      ],
      "cta": [
        670,
        1500,
        330,
        220
      ],
      "brand": [
        80,
        160,
        400,
        65
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1222,
        920,
        36
      ],
      "headlineSize": 92,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left"
    },
    "landscape": {
      "title": [
        52,
        385,
        540,
        92
      ],
      "body": [
        52,
        490,
        540,
        40
      ],
      "visual": [
        52,
        125,
        976,
        215
      ],
      "cta": [
        650,
        430,
        378,
        85
      ],
      "brand": [
        52,
        48,
        400,
        48
      ],
      "kicker": [
        750,
        48,
        278,
        45
      ],
      "annotation": [
        52,
        352,
        976,
        36
      ],
      "headlineSize": 48,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left"
    }
  }
};
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
freeze(LAYOUT_GEOMETRY);
var LAYOUT_RESOURCES = freeze({
  "lateral": {
    "id": "lateral",
    "version": 1,
    "sha256": "bdc5d70d1b0818e93fcc6df42159c703196b131733590f82be863c1c32c12ff5"
  },
  "broadside": {
    "id": "broadside",
    "version": 1,
    "sha256": "7a2c50f43f4accc36175ea57ecc52885f80bb3015e647e5cad9fdfcdf59e8d65"
  },
  "specimen": {
    "id": "specimen",
    "version": 1,
    "sha256": "5435adec8b9f15c22751e12821af9a3ec8b847bd19fb579ad693db354baebc2b"
  },
  "centered": {
    "id": "centered",
    "version": 1,
    "sha256": "1c909e9874c7e0637f73feb9e7d167378630a0b5718546b908314375f331ef8c"
  },
  "spread": {
    "id": "spread",
    "version": 1,
    "sha256": "80cbe59087d0bdf1c9f65e025b4e603b54f7b17e7459be266e6eededf16d4b12"
  },
  "cover": {
    "id": "cover",
    "version": 1,
    "sha256": "07d3d9689bd000229c43c42ceebee5fca73e14535c1d491e7f42e682f018c365"
  }
});
function layoutPlan(id, format = "square", density = "balanced") {
  if (!Object.hasOwn(LAYOUT_GEOMETRY, id) || !Object.hasOwn(LAYOUT_GEOMETRY[id], format)) throw Error("Choose a supported layout and format.");
  if (!["compact", "balanced", "generous"].includes(density)) throw Error("Choose a supported layout density.");
  const p = JSON.parse(JSON.stringify(LAYOUT_GEOMETRY[id][format]));
  p.density = density;
  p.leading = density === "compact" ? 1.05 : density === "generous" ? 1.25 : 1.15;
  return p;
}
function flowCopyPlan(plan, { headlineHeight, bodyHeight = 0, hasBody = bodyHeight > 0 }) {
  const f = plan.copyFlow;
  if (!f) return { bodyY: plan.body[1], ctaY: plan.cta[1] };
  const headlineBottom = plan.title[1] + headlineHeight, bodyY = headlineBottom + (hasBody ? f.headlineBodyGap : 0);
  return { bodyY, ctaY: (hasBody ? bodyY + bodyHeight : headlineBottom) + f.bodyCtaGap };
}

// composition-model.js
var plain = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
var clone = (value) => JSON.parse(JSON.stringify(value));
function freeze2(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze2);
    Object.freeze(value);
  }
  return value;
}
var LAYOUTS = freeze2([
  { id: "lateral", label: "Lateral", description: "Copy left, visual right, action below the copy.", version: 1 },
  { id: "broadside", label: "Broadside", description: "Upper headline, lower visual and independent action.", version: 1 },
  { id: "specimen", label: "Specimen", description: "Complete central original, lower headline, upper action.", version: 1 },
  { id: "centered", label: "Centered", description: "Centered reading stack with an edge motif.", version: 1 },
  { id: "spread", label: "Spread", description: "Narrow right reading column and left visual.", version: 1 },
  { id: "cover", label: "Cover", description: "Generous upper visual with lower type and action.", version: 1 }
]);
var MOTIF_OPTIONS = freeze2([
  { id: "none", label: "None", description: "No decorative motif." },
  { id: "ribbon-v1", label: "Ribbon", description: "A flowing modular ribbon." },
  { id: "orbit-v1", label: "Orbit", description: "An open orbital structure." },
  { id: "proof-marks-v1", label: "Proof marks", description: "Creative registration and proof marks." },
  { id: "responsive-frames-v1", label: "Responsive frames", description: "Nested responsive proportions." },
  { id: "answer-exchange-v1", label: "Answer exchange", description: "A conceptual dialogue, without invented data." },
  { id: "research-folio-v1", label: "Research folio", description: "Editorial folio structure." },
  { id: "decision-junction-v1", label: "Decision junction", description: "A conceptual branching decision." },
  { id: "interface-modules-v1", label: "Interface modules", description: "Interlocking conceptual interface modules." }
]);
var CTA_STYLES = freeze2(["strip", "rectangle", "rounded", "pill", "outline", "text"].map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) })));
var PALETTE_ROLES = freeze2(["primary", "accent", "ink", "paper"]);
var FLEX_GROUP_DEFAULTS = freeze2({
  composition: { layout: "lateral", version: 1, density: "balanced", profile: null },
  motif: { id: "none", opacity: 0.15, color: "auto", x: 0.75, y: 0.65, scale: 1, rotation: 0 },
  cta: { style: "strip", width: "full", align: "left", paddingX: 24, paddingY: 16, fill: { mode: "palette", value: "accent" }, text: { mode: "auto" }, arrow: true },
  textColors: { headline: "auto", body: "auto", brand: "auto", kicker: "auto" }
});
function keys(value, allowed, label) {
  if (!plain(value)) throw new Error(`${label} must be an object.`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw new Error(`Unsupported ${label} option: ${key}.`);
}
function one(value, choices, label) {
  if (!choices.includes(value)) throw new Error(`Choose a supported ${label}.`);
  return value;
}
function number(value, min, max, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}.`);
  return value;
}
function mergeComposition(base, override) {
  const result = clone(base);
  for (const [key, value] of Object.entries(override)) result[key] = key === "text" && value?.mode === "auto" ? clone(value) : plain(value) && plain(result[key]) ? mergeComposition(result[key], value) : clone(value);
  return result;
}
function colour(value, text2, partial) {
  keys(value, ["mode", "value"], "CTA colour");
  if (Object.hasOwn(value, "mode")) one(value.mode, text2 ? ["palette", "custom", "auto"] : ["palette", "custom"], "CTA colour mode");
  if (Object.hasOwn(value, "value") && !(PALETTE_ROLES.includes(value.value) || typeof value.value === "string" && /^#[0-9a-fA-F]{6}$/.test(value.value))) throw new Error("CTA colour requires a palette role or six-digit hex.");
  if (!partial) {
    one(value.mode, text2 ? ["palette", "custom", "auto"] : ["palette", "custom"], "CTA colour mode");
    if (value.mode === "auto") {
      if (Object.hasOwn(value, "value")) throw new Error("Auto CTA text cannot contain a colour value.");
    } else if (value.mode === "palette") one(value.value, PALETTE_ROLES, "CTA palette role");
    else if (typeof value.value !== "string" || !/^#[0-9a-fA-F]{6}$/.test(value.value)) throw new Error("Custom CTA colour requires six-digit hex.");
  }
  return clone(value);
}
function provenance(value) {
  if (value === null) return null;
  keys(value, ["id", "version", "sha256", "ordinal"], "composition profile provenance");
  one(value.id, ["creative-modular", "research-editorial", "custom"], "composition profile");
  if (value.version !== 1 || typeof value.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(value.sha256) || !Number.isSafeInteger(value.ordinal) || value.ordinal < 0) throw new Error("Invalid composition profile provenance.");
  return clone(value);
}
function normalizeFlexibleGroup(group, value, partial = false) {
  const defaults = FLEX_GROUP_DEFAULTS[group];
  if (!defaults) throw new Error("Unsupported flexible group.");
  keys(value, Object.keys(defaults), `poster ${group}`);
  for (const [key, item] of Object.entries(value)) {
    if (group === "composition") {
      if (key === "layout") one(item, LAYOUTS.map((x) => x.id), "layout");
      if (key === "version" && item !== 1) throw new Error("Composition version must be 1.");
      if (key === "density") one(item, ["compact", "balanced", "generous"], "composition density");
      if (key === "profile") provenance(item);
    } else if (group === "motif") {
      if (key === "id") one(item, MOTIF_OPTIONS.map((x) => x.id), "motif");
      if (key === "color") one(item, ["auto", ...PALETTE_ROLES], "motif colour");
      const bounds = { opacity: [0, 1], x: [0, 1], y: [0, 1], scale: [0.25, 2], rotation: [-180, 180] };
      if (bounds[key]) number(item, ...bounds[key], `motif ${key}`);
    } else if (group === "textColors") one(item, ["auto", ...PALETTE_ROLES], "text colour");
    else {
      if (key === "style") one(item, CTA_STYLES.map((x) => x.id), "CTA style");
      if (key === "width") one(item, ["fit", "full"], "CTA width");
      if (key === "align") one(item, ["left", "center", "right"], "CTA alignment");
      if (key === "paddingX") number(item, 0, 64, "CTA horizontal padding");
      if (key === "paddingY") number(item, 0, 40, "CTA vertical padding");
      if (key === "arrow" && typeof item !== "boolean") throw new Error("CTA arrow must be boolean.");
      if (key === "fill" || key === "text") colour(item, key === "text", true);
    }
  }
  if (partial) return clone(value);
  const result = mergeComposition(defaults, value);
  if (group === "cta") {
    if (value.text?.mode === "auto") result.text = clone(value.text);
    colour(result.fill, false, false);
    colour(result.text, true, false);
  }
  return result;
}
var profileBase = { version: 1, id: "custom", layouts: ["lateral"], motifs: ["none"], density: "balanced", motifOpacity: 0.15, cta: FLEX_GROUP_DEFAULTS.cta, vary: false };
var PROFILE_PRESETS = freeze2([
  { id: "creative-modular", label: "Creative modular", description: "Lateral, broadside and specimen with a creative modular vocabulary.", profile: { ...clone(profileBase), id: "creative-modular", layouts: ["lateral", "broadside", "specimen"], motifs: ["proof-marks-v1", "responsive-frames-v1", "answer-exchange-v1"], cta: { ...clone(FLEX_GROUP_DEFAULTS.cta), style: "pill", width: "fit", fill: { mode: "palette", value: "primary" } }, vary: true } },
  { id: "research-editorial", label: "Research editorial", description: "Centered, spread and cover with conceptual research diagrams.", profile: { ...clone(profileBase), id: "research-editorial", layouts: ["centered", "spread", "cover"], motifs: ["research-folio-v1", "decision-junction-v1", "interface-modules-v1"], cta: { ...clone(FLEX_GROUP_DEFAULTS.cta), style: "rounded", width: "fit", fill: { mode: "palette", value: "primary" } }, vary: true } }
]);
function normalizeCompositionProfile(value) {
  keys(value, Object.keys(profileBase), "composition profile");
  const base = PROFILE_PRESETS.find((p) => p.id === value.id)?.profile ?? profileBase;
  const result = { ...clone(base), ...clone(value) };
  if (result.version !== 1) throw new Error("Composition profile version must be 1.");
  one(result.id, ["creative-modular", "research-editorial", "custom"], "composition profile");
  const profileLayouts = [...LAYOUTS, ...["bold-backdrop", "subject-right", "image-lead", "centered-announcement", "service-sheet", "subject-left", "image-footer", "framed-focus", "type-led", "offset-grid"].map((id) => ({ id }))];
  for (const [key, vocabulary] of [["layouts", profileLayouts], ["motifs", MOTIF_OPTIONS]]) {
    const ids = vocabulary.map((x) => x.id), list = result[key];
    if (!Array.isArray(list) || list.length < 1 || list.length > ids.length || new Set(list).size !== list.length || list.some((x) => !ids.includes(x))) throw new Error(`Choose a bounded unique list of profile ${key}.`);
  }
  one(result.density, ["compact", "balanced", "generous"], "profile density");
  number(result.motifOpacity, 0, 1, "profile motif opacity");
  if (typeof result.vary !== "boolean") throw new Error("Profile vary must be boolean.");
  if (Object.hasOwn(value, "cta")) keys(value.cta, Object.keys(FLEX_GROUP_DEFAULTS.cta), "profile CTA");
  const cta = mergeComposition(base.cta, value.cta ?? {}), templateWidth = ["column", "poster"].includes(cta.width) ? cta.width : null;
  result.cta = normalizeFlexibleGroup("cta", { ...cta, ...templateWidth ? { width: "full" } : {} });
  if (templateWidth) result.cta.width = templateWidth;
  return Object.fromEntries(Object.keys(profileBase).map((key) => [key, result[key]]));
}
function compositionProfileSha256(value) {
  const profile = normalizeCompositionProfile(value);
  const stable = (v) => plain(v) ? Object.fromEntries(Object.keys(v).sort().map((k2) => [k2, stable(v[k2])])) : Array.isArray(v) ? v.map(stable) : v;
  const bytes = new TextEncoder().encode(JSON.stringify(stable(profile))), length = bytes.length;
  const data = new Uint8Array(Math.ceil((length + 9) / 64) * 64);
  data.set(bytes);
  data[length] = 128;
  const view = new DataView(data.buffer);
  view.setUint32(data.length - 4, length * 8);
  const k = [], initial = [];
  for (let n = 2; k.length < 64; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) {
      prime = false;
      break;
    }
    if (prime) {
      if (initial.length < 8) initial.push(Math.sqrt(n) % 1 * 4294967296 | 0);
      k.push(Math.cbrt(n) % 1 * 4294967296 | 0);
    }
  }
  const h = initial, w = new Int32Array(64), r = (x, n) => x >>> n | x << 32 - n;
  for (let start = 0; start < data.length; start += 64) {
    for (let i = 0; i < 64; i++) w[i] = i < 16 ? view.getInt32(start + i * 4) : w[i - 16] + (r(w[i - 15], 7) ^ r(w[i - 15], 18) ^ w[i - 15] >>> 3) + w[i - 7] + (r(w[i - 2], 17) ^ r(w[i - 2], 19) ^ w[i - 2] >>> 10) | 0;
    let [a, b, c, d, e, f, g, j] = h;
    for (let i = 0; i < 64; i++) {
      const t = j + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + (e & f ^ ~e & g) + k[i] + w[i] | 0, u = (r(a, 2) ^ r(a, 13) ^ r(a, 22)) + (a & b ^ a & c ^ b & c) | 0;
      j = g;
      g = f;
      f = e;
      e = d + t | 0;
      d = c;
      c = b;
      b = a;
      a = t + u | 0;
    }
    [a, b, c, d, e, f, g, j].forEach((x, i) => {
      h[i] = h[i] + x | 0;
    });
  }
  return h.map((x) => (x >>> 0).toString(16).padStart(8, "0")).join("");
}

// src/layout-kernel-template.js
var TEMPLATE_GEOMETRY = {
  "bold-backdrop": {
    "square": {
      "title": [
        64,
        170,
        952,
        430
      ],
      "body": [
        64,
        606,
        430,
        250
      ],
      "visual": [
        520,
        486,
        496,
        390
      ],
      "cta": [
        64,
        900,
        430,
        116
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        520,
        872,
        496,
        36
      ],
      "headlineSize": 120,
      "bodySize": 34,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        1080
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true
    },
    "portrait": {
      "title": [
        64,
        184,
        952,
        680
      ],
      "body": [
        64,
        790,
        390,
        300
      ],
      "visual": [
        500,
        580,
        516,
        600
      ],
      "cta": [
        64,
        1180,
        390,
        116
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        520,
        1130,
        496,
        36
      ],
      "headlineSize": 132,
      "bodySize": 36,
      "ctaSize": 34,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        1350
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "footer": true
    },
    "story": {
      "title": [
        80,
        300,
        920,
        720
      ],
      "body": [
        80,
        1120,
        480,
        330
      ],
      "visual": [
        580,
        900,
        420,
        700
      ],
      "cta": [
        80,
        1640,
        480,
        120
      ],
      "brand": [
        80,
        160,
        430,
        64
      ],
      "kicker": [
        640,
        160,
        360,
        60
      ],
      "annotation": [
        580,
        1590,
        420,
        36
      ],
      "headlineSize": 140,
      "bodySize": 40,
      "ctaSize": 36,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        1920
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "footer": true
    },
    "landscape": {
      "title": [
        52,
        126,
        730,
        185
      ],
      "body": [
        52,
        330,
        520,
        100
      ],
      "visual": [
        670,
        122,
        358,
        300
      ],
      "cta": [
        52,
        437.2,
        520,
        76
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        680,
        44,
        348,
        45
      ],
      "annotation": [
        680,
        400,
        348,
        30
      ],
      "headlineSize": 72,
      "bodySize": 24,
      "ctaSize": 26,
      "align": "left",
      "backgroundBox": [
        0,
        0,
        1080,
        565.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "footer": true
    }
  },
  "subject-right": {
    "square": {
      "title": [
        64,
        220,
        520,
        450
      ],
      "body": [
        64,
        620,
        520,
        170
      ],
      "visual": [
        630,
        180,
        386,
        710
      ],
      "cta": [
        64,
        220,
        520,
        796
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        630,
        912,
        386,
        36
      ],
      "headlineSize": 96,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        630,
        180,
        386,
        710
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          220,
          520,
          796
        ],
        "headlineBodyGap": 32,
        "bodyCtaGap": 36
      }
    },
    "portrait": {
      "title": [
        64,
        280,
        520,
        510
      ],
      "body": [
        64,
        826,
        520,
        220
      ],
      "visual": [
        630,
        220,
        386,
        890
      ],
      "cta": [
        64,
        280,
        520,
        1016
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        630,
        1132,
        386,
        36
      ],
      "headlineSize": 96,
      "bodySize": 32,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        630,
        220,
        386,
        890
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          280,
          520,
          1016
        ],
        "headlineBodyGap": 36,
        "bodyCtaGap": 40
      }
    },
    "story": {
      "title": [
        80,
        420,
        500,
        670
      ],
      "body": [
        80,
        1130,
        500,
        300
      ],
      "visual": [
        630,
        360,
        370,
        1200
      ],
      "cta": [
        80,
        420,
        500,
        1340
      ],
      "brand": [
        80,
        160,
        420,
        64
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        630,
        1590,
        370,
        36
      ],
      "headlineSize": 96,
      "bodySize": 36,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        630,
        360,
        370,
        1200
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          80,
          420,
          500,
          1340
        ],
        "headlineBodyGap": 40,
        "bodyCtaGap": 44
      }
    },
    "landscape": {
      "title": [
        52,
        150,
        520,
        210
      ],
      "body": [
        52,
        372,
        520,
        120
      ],
      "visual": [
        650,
        116,
        378,
        350
      ],
      "cta": [
        52,
        150,
        520,
        363.2
      ],
      "brand": [
        52,
        44,
        420,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        650,
        477,
        378,
        28
      ],
      "headlineSize": 52,
      "bodySize": 24,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        650,
        116,
        378,
        350
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          52,
          150,
          520,
          363.2
        ],
        "headlineBodyGap": 22,
        "bodyCtaGap": 26
      }
    }
  },
  "image-lead": {
    "square": {
      "title": [
        64,
        596,
        952,
        220
      ],
      "body": [
        64,
        834,
        952,
        110
      ],
      "visual": [
        64,
        160,
        952,
        390
      ],
      "cta": [
        64,
        596,
        952,
        420
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        64,
        560,
        952,
        28
      ],
      "headlineSize": 92,
      "bodySize": 28,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        160,
        952,
        390
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          596,
          952,
          420
        ],
        "headlineBodyGap": 24,
        "bodyCtaGap": 28
      }
    },
    "portrait": {
      "title": [
        64,
        746,
        952,
        370
      ],
      "body": [
        64,
        1070,
        952,
        125
      ],
      "visual": [
        64,
        170,
        952,
        530
      ],
      "cta": [
        64,
        746,
        952,
        550
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        64,
        710,
        952,
        28
      ],
      "headlineSize": 108,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        64,
        170,
        952,
        530
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          746,
          952,
          550
        ],
        "headlineBodyGap": 26,
        "bodyCtaGap": 28
      }
    },
    "story": {
      "title": [
        80,
        1140,
        920,
        420
      ],
      "body": [
        80,
        1550,
        920,
        130
      ],
      "visual": [
        80,
        280,
        920,
        780
      ],
      "cta": [
        80,
        1140,
        920,
        620
      ],
      "brand": [
        80,
        160,
        420,
        64
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        80,
        1080,
        920,
        32
      ],
      "headlineSize": 120,
      "bodySize": 32,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        80,
        280,
        920,
        780
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          80,
          1140,
          920,
          620
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 32
      }
    },
    "landscape": {
      "title": [
        598,
        156,
        430,
        196
      ],
      "body": [
        598,
        370,
        430,
        98
      ],
      "visual": [
        52,
        126,
        494,
        387.2
      ],
      "cta": [
        598,
        156,
        430,
        357.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        598,
        118,
        430,
        26
      ],
      "headlineSize": 44,
      "bodySize": 20,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        52,
        126,
        494,
        387.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          598,
          156,
          430,
          357.2
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 24
      }
    }
  },
  "centered-announcement": {
    "square": {
      "title": [
        160,
        280,
        760,
        420
      ],
      "body": [
        200,
        660,
        680,
        190
      ],
      "visual": [
        440,
        214,
        200,
        50
      ],
      "cta": [
        200,
        280,
        680,
        736
      ],
      "brand": [
        180,
        70,
        720,
        64
      ],
      "kicker": [
        180,
        150,
        720,
        54
      ],
      "annotation": [
        200,
        920,
        680,
        30
      ],
      "headlineSize": 100,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        1080
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          160,
          280,
          760,
          736
        ],
        "headlineBodyGap": 40,
        "bodyCtaGap": 40
      }
    },
    "portrait": {
      "title": [
        140,
        360,
        800,
        580
      ],
      "body": [
        200,
        824,
        680,
        240
      ],
      "visual": [
        420,
        250,
        240,
        80
      ],
      "cta": [
        200,
        360,
        680,
        936
      ],
      "brand": [
        180,
        100,
        720,
        64
      ],
      "kicker": [
        180,
        184,
        720,
        54
      ],
      "annotation": [
        200,
        1190,
        680,
        30
      ],
      "headlineSize": 120,
      "bodySize": 32,
      "ctaSize": 32,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        1350
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          140,
          360,
          800,
          936
        ],
        "headlineBodyGap": 44,
        "bodyCtaGap": 44
      }
    },
    "story": {
      "title": [
        120,
        540,
        840,
        580
      ],
      "body": [
        180,
        1168,
        720,
        300
      ],
      "visual": [
        400,
        410,
        280,
        100
      ],
      "cta": [
        180,
        540,
        720,
        1220
      ],
      "brand": [
        180,
        220,
        720,
        64
      ],
      "kicker": [
        180,
        304,
        720,
        54
      ],
      "annotation": [
        180,
        1660,
        720,
        32
      ],
      "headlineSize": 128,
      "bodySize": 36,
      "ctaSize": 34,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        1920
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          120,
          540,
          840,
          1220
        ],
        "headlineBodyGap": 48,
        "bodyCtaGap": 48
      }
    },
    "landscape": {
      "title": [
        160,
        154,
        760,
        190
      ],
      "body": [
        200,
        368,
        680,
        100
      ],
      "visual": [
        460,
        414,
        160,
        50
      ],
      "cta": [
        200,
        154,
        680,
        359.2
      ],
      "brand": [
        180,
        44,
        720,
        48
      ],
      "kicker": [
        180,
        104,
        720,
        34
      ],
      "annotation": [
        200,
        478,
        680,
        26
      ],
      "headlineSize": 64,
      "bodySize": 24,
      "ctaSize": 24,
      "align": "center",
      "backgroundBox": [
        0,
        0,
        1080,
        565.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          160,
          154,
          760,
          359.2
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 24
      }
    }
  },
  "service-sheet": {
    "square": {
      "title": [
        64,
        190,
        952,
        420
      ],
      "body": [
        64,
        500,
        570,
        310
      ],
      "visual": [
        710,
        536,
        306,
        320
      ],
      "cta": [
        64,
        190,
        570,
        826
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        710,
        878,
        306,
        36
      ],
      "headlineSize": 108,
      "bodySize": 36,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        710,
        536,
        306,
        320
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          190,
          570,
          826
        ],
        "headlineBodyGap": 48,
        "bodyCtaGap": 44
      }
    },
    "portrait": {
      "title": [
        64,
        240,
        952,
        430
      ],
      "body": [
        64,
        638,
        580,
        400
      ],
      "visual": [
        710,
        694,
        306,
        410
      ],
      "cta": [
        64,
        240,
        580,
        1056
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        680,
        54,
        336,
        60
      ],
      "annotation": [
        710,
        1128,
        306,
        36
      ],
      "headlineSize": 124,
      "bodySize": 40,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        710,
        694,
        306,
        410
      ],
      "posterCta": [
        64,
        1180,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          240,
          580,
          1056
        ],
        "headlineBodyGap": 48,
        "bodyCtaGap": 48
      }
    },
    "story": {
      "title": [
        80,
        380,
        920,
        680
      ],
      "body": [
        80,
        912,
        560,
        610
      ],
      "visual": [
        700,
        982,
        300,
        580
      ],
      "cta": [
        80,
        380,
        560,
        1380
      ],
      "brand": [
        80,
        160,
        420,
        64
      ],
      "kicker": [
        650,
        160,
        350,
        60
      ],
      "annotation": [
        700,
        1588,
        300,
        36
      ],
      "headlineSize": 140,
      "bodySize": 44,
      "ctaSize": 34,
      "align": "left",
      "backgroundBox": [
        700,
        982,
        300,
        580
      ],
      "posterCta": [
        80,
        1640,
        920,
        120
      ],
      "copyFlow": {
        "box": [
          80,
          380,
          560,
          1380
        ],
        "headlineBodyGap": 52,
        "bodyCtaGap": 48
      }
    },
    "landscape": {
      "title": [
        52,
        144,
        560,
        210
      ],
      "body": [
        52,
        144,
        560,
        160
      ],
      "visual": [
        650,
        126,
        378,
        387.2
      ],
      "cta": [
        52,
        144,
        560,
        369.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        485,
        560,
        26
      ],
      "headlineSize": 56,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        650,
        126,
        378,
        387.2
      ],
      "posterCta": [
        52,
        437.2,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          52,
          144,
          560,
          369.2
        ],
        "bodyCtaGap": 24,
        "headlineBodyGap": 20
      }
    }
  },
  "subject-left": {
    "square": {
      "title": [
        510,
        220,
        506,
        500
      ],
      "body": [
        510,
        580,
        506,
        300
      ],
      "visual": [
        64,
        230,
        390,
        640
      ],
      "cta": [
        510,
        220,
        506,
        796
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        510,
        180,
        506,
        36
      ],
      "headlineSize": 80,
      "bodySize": 28,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        230,
        390,
        640
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          510,
          220,
          506,
          796
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "portrait": {
      "title": [
        510,
        280,
        506,
        650
      ],
      "body": [
        510,
        720,
        506,
        340
      ],
      "visual": [
        64,
        250,
        390,
        860
      ],
      "cta": [
        510,
        280,
        506,
        1016
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        510,
        240,
        506,
        36
      ],
      "headlineSize": 96,
      "bodySize": 30,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        250,
        390,
        860
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          510,
          280,
          506,
          1016
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "story": {
      "title": [
        480,
        420,
        520,
        700
      ],
      "body": [
        480,
        1080,
        520,
        440
      ],
      "visual": [
        80,
        450,
        370,
        1110
      ],
      "cta": [
        480,
        420,
        520,
        1340
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        510,
        380,
        490,
        36
      ],
      "headlineSize": 96,
      "bodySize": 34,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        80,
        450,
        370,
        1110
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "copyFlow": {
        "box": [
          480,
          420,
          520,
          1340
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "landscape": {
      "title": [
        550,
        126,
        478,
        250
      ],
      "body": [
        550,
        320,
        478,
        180
      ],
      "visual": [
        52,
        126,
        446,
        387.2
      ],
      "cta": [
        550,
        126,
        478,
        387.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        550,
        104,
        478,
        26
      ],
      "headlineSize": 52,
      "bodySize": 23,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        52,
        126,
        446,
        387.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "copyFlow": {
        "box": [
          550,
          126,
          478,
          387.2
        ],
        "headlineBodyGap": 20,
        "bodyCtaGap": 20
      }
    }
  },
  "image-footer": {
    "square": {
      "title": [
        64,
        170,
        952,
        280
      ],
      "body": [
        64,
        420,
        952,
        150
      ],
      "visual": [
        64,
        650,
        952,
        366
      ],
      "cta": [
        64,
        170,
        952,
        430
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        130,
        952,
        36
      ],
      "headlineSize": 88,
      "bodySize": 30,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        64,
        650,
        952,
        366
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          170,
          952,
          430
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "portrait": {
      "title": [
        64,
        190,
        952,
        300
      ],
      "body": [
        64,
        470,
        952,
        180
      ],
      "visual": [
        64,
        740,
        952,
        556
      ],
      "cta": [
        64,
        190,
        952,
        510
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        150,
        952,
        36
      ],
      "headlineSize": 96,
      "bodySize": 32,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        64,
        740,
        952,
        556
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "copyFlow": {
        "box": [
          64,
          190,
          952,
          510
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "story": {
      "title": [
        80,
        340,
        920,
        430
      ],
      "body": [
        80,
        780,
        920,
        230
      ],
      "visual": [
        80,
        1130,
        920,
        630
      ],
      "cta": [
        80,
        340,
        920,
        690
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        80,
        300,
        920,
        36
      ],
      "headlineSize": 112,
      "bodySize": 36,
      "ctaSize": 32,
      "align": "left",
      "backgroundBox": [
        80,
        1130,
        920,
        630
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "copyFlow": {
        "box": [
          80,
          340,
          920,
          690
        ],
        "headlineBodyGap": 28,
        "bodyCtaGap": 28
      }
    },
    "landscape": {
      "title": [
        52,
        126,
        976,
        130
      ],
      "body": [
        52,
        276,
        430,
        160
      ],
      "visual": [
        550,
        260,
        478,
        253.2
      ],
      "cta": [
        52,
        276,
        430,
        237.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        236,
        430,
        26
      ],
      "headlineSize": 52,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        550,
        260,
        478,
        253.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true
    }
  },
  "framed-focus": {
    "square": {
      "title": [
        64,
        180,
        952,
        220
      ],
      "body": [
        160,
        790,
        760,
        120
      ],
      "visual": [
        180,
        440,
        720,
        300
      ],
      "cta": [
        160,
        922,
        760,
        94
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        160,
        882,
        760,
        36
      ],
      "headlineSize": 96,
      "bodySize": 28,
      "ctaSize": 28,
      "align": "center",
      "backgroundBox": [
        180,
        440,
        720,
        300
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true,
      "backgroundFit": "contain"
    },
    "portrait": {
      "title": [
        64,
        200,
        952,
        260
      ],
      "body": [
        160,
        1010,
        760,
        170
      ],
      "visual": [
        180,
        510,
        720,
        430
      ],
      "cta": [
        160,
        1200,
        760,
        96
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        160,
        1160,
        760,
        36
      ],
      "headlineSize": 96,
      "bodySize": 30,
      "ctaSize": 30,
      "align": "center",
      "backgroundBox": [
        180,
        510,
        720,
        430
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "footer": true,
      "backgroundFit": "contain"
    },
    "story": {
      "title": [
        80,
        340,
        920,
        380
      ],
      "body": [
        140,
        1440,
        800,
        180
      ],
      "visual": [
        180,
        760,
        720,
        600
      ],
      "cta": [
        140,
        1640,
        800,
        120
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        140,
        1600,
        800,
        36
      ],
      "headlineSize": 104,
      "bodySize": 34,
      "ctaSize": 32,
      "align": "center",
      "backgroundBox": [
        180,
        760,
        720,
        600
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "footer": true,
      "backgroundFit": "contain"
    },
    "landscape": {
      "title": [
        52,
        126,
        540,
        195
      ],
      "body": [
        52,
        335,
        540,
        105
      ],
      "visual": [
        650,
        126,
        378,
        387.2
      ],
      "cta": [
        52,
        450,
        540,
        63.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        410,
        540,
        26
      ],
      "headlineSize": 56,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        650,
        126,
        378,
        387.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true,
      "backgroundFit": "contain"
    }
  },
  "type-led": {
    "square": {
      "title": [
        64,
        180,
        952,
        570
      ],
      "body": [
        64,
        780,
        620,
        180
      ],
      "visual": [
        770,
        760,
        246,
        230
      ],
      "cta": [
        64,
        940,
        620,
        76
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        900,
        620,
        36
      ],
      "headlineSize": 128,
      "bodySize": 32,
      "ctaSize": 26,
      "align": "left",
      "backgroundBox": [
        770,
        760,
        246,
        230
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true
    },
    "portrait": {
      "title": [
        64,
        220,
        952,
        650
      ],
      "body": [
        64,
        950,
        620,
        190
      ],
      "visual": [
        770,
        950,
        246,
        220
      ],
      "cta": [
        64,
        1200,
        620,
        96
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        64,
        1160,
        620,
        36
      ],
      "headlineSize": 144,
      "bodySize": 34,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        770,
        950,
        246,
        220
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "footer": true
    },
    "story": {
      "title": [
        80,
        370,
        920,
        800
      ],
      "body": [
        80,
        1300,
        600,
        250
      ],
      "visual": [
        750,
        1330,
        250,
        250
      ],
      "cta": [
        80,
        1640,
        600,
        120
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        80,
        1630,
        600,
        36
      ],
      "headlineSize": 160,
      "bodySize": 38,
      "ctaSize": 30,
      "align": "left",
      "backgroundBox": [
        750,
        1330,
        250,
        250
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "footer": true
    },
    "landscape": {
      "title": [
        52,
        126,
        976,
        225
      ],
      "body": [
        52,
        360,
        640,
        90
      ],
      "visual": [
        820,
        335,
        208,
        178.2
      ],
      "cta": [
        52,
        450,
        640,
        63.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        52,
        410,
        640,
        26
      ],
      "headlineSize": 80,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        820,
        335,
        208,
        178.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true
    }
  },
  "offset-grid": {
    "square": {
      "title": [
        64,
        170,
        952,
        270
      ],
      "body": [
        610,
        550,
        406,
        240
      ],
      "visual": [
        64,
        540,
        460,
        440
      ],
      "cta": [
        610,
        850,
        406,
        166
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        610,
        810,
        406,
        36
      ],
      "headlineSize": 96,
      "bodySize": 28,
      "ctaSize": 24,
      "align": "left",
      "backgroundBox": [
        64,
        540,
        460,
        440
      ],
      "posterCta": [
        64,
        900,
        952,
        116
      ],
      "footer": true
    },
    "portrait": {
      "title": [
        64,
        210,
        952,
        400
      ],
      "body": [
        610,
        750,
        406,
        300
      ],
      "visual": [
        64,
        720,
        460,
        520
      ],
      "cta": [
        610,
        1140,
        406,
        156
      ],
      "brand": [
        64,
        54,
        430,
        64
      ],
      "kicker": [
        620,
        54,
        396,
        60
      ],
      "annotation": [
        610,
        1100,
        406,
        36
      ],
      "headlineSize": 112,
      "bodySize": 30,
      "ctaSize": 26,
      "align": "left",
      "backgroundBox": [
        64,
        720,
        460,
        520
      ],
      "posterCta": [
        64,
        1170,
        952,
        116
      ],
      "footer": true
    },
    "story": {
      "title": [
        80,
        350,
        920,
        580
      ],
      "body": [
        600,
        1080,
        400,
        380
      ],
      "visual": [
        80,
        1020,
        440,
        690
      ],
      "cta": [
        600,
        1580,
        400,
        180
      ],
      "brand": [
        80,
        170,
        430,
        64
      ],
      "kicker": [
        620,
        170,
        380,
        60
      ],
      "annotation": [
        600,
        1540,
        400,
        36
      ],
      "headlineSize": 128,
      "bodySize": 34,
      "ctaSize": 28,
      "align": "left",
      "backgroundBox": [
        80,
        1020,
        440,
        690
      ],
      "posterCta": [
        80,
        1644,
        920,
        116
      ],
      "footer": true
    },
    "landscape": {
      "title": [
        52,
        126,
        976,
        130
      ],
      "body": [
        530,
        300,
        498,
        120
      ],
      "visual": [
        52,
        300,
        410,
        213.2
      ],
      "cta": [
        530,
        430,
        498,
        83.2
      ],
      "brand": [
        52,
        44,
        430,
        48
      ],
      "kicker": [
        710,
        44,
        318,
        45
      ],
      "annotation": [
        530,
        390,
        498,
        26
      ],
      "headlineSize": 52,
      "bodySize": 23,
      "ctaSize": 22,
      "align": "left",
      "backgroundBox": [
        52,
        300,
        410,
        213.2
      ],
      "posterCta": [
        52,
        437.20000000000005,
        976,
        76
      ],
      "footer": true
    }
  }
};
function freeze3(v) {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze3);
    Object.freeze(v);
  }
  return v;
}
freeze3(TEMPLATE_GEOMETRY);
var TEMPLATE_RESOURCES = freeze3({
  "bold-backdrop": {
    "id": "bold-backdrop",
    "version": 1,
    "sha256": "759a7b7156a27849caf0ff61db7c432c53b145d0f21931c4548f3b348021f217"
  },
  "subject-right": {
    "id": "subject-right",
    "version": 1,
    "sha256": "781426bb8ae8134eb8bf25af0d145706bd6612d46dd7431a4f34505e4c03b8d3"
  },
  "image-lead": {
    "id": "image-lead",
    "version": 1,
    "sha256": "14e1405bb51992122b1cfff24421822cdf3d213e32cfc75e2ef55065f31c0e4b"
  },
  "centered-announcement": {
    "id": "centered-announcement",
    "version": 1,
    "sha256": "04bf9e4e152a7efbad7dda59de05e0f4563d3bb645dca436804afc1c49b642c7"
  },
  "service-sheet": {
    "id": "service-sheet",
    "version": 1,
    "sha256": "68fcd13a7d284f79d8eb29f26d2fa2235db676d24455c28d827c395817d347d8"
  },
  "subject-left": {
    "id": "subject-left",
    "version": 1,
    "sha256": "873beafbbb1b645a2060253e8183323caada7f79e7e18ba31967351a04e9b839"
  },
  "image-footer": {
    "id": "image-footer",
    "version": 1,
    "sha256": "8e549c87f1c14d1a3ffbf2beb1b43a74535a1d324b044b6e05071cbfb7a02e6e"
  },
  "framed-focus": {
    "id": "framed-focus",
    "version": 1,
    "sha256": "40a4a53c4e88f910f51d0af70e06c945022615c90a3924a4c475265847de5935"
  },
  "type-led": {
    "id": "type-led",
    "version": 1,
    "sha256": "cb6d39fb0e64d9e03ffe4f2eac5d6000f61c6dcf06b50ff478bbbf024a681596"
  },
  "offset-grid": {
    "id": "offset-grid",
    "version": 1,
    "sha256": "0dc37929f62356b4ffabc0d864643b075f86f9898242bb3a83f1ae1111c34159"
  }
});
function templatePlan(id, format = "square", density = "balanced") {
  if (!Object.hasOwn(TEMPLATE_GEOMETRY, id) || !Object.hasOwn(TEMPLATE_GEOMETRY[id], format)) throw Error("Choose a supported template and format.");
  if (!["compact", "balanced", "generous"].includes(density)) throw Error("Choose supported composition spacing.");
  const p = JSON.parse(JSON.stringify(TEMPLATE_GEOMETRY[id][format]));
  p.density = density;
  p.leading = density === "compact" ? 1.02 : density === "generous" ? 1.16 : 1.08;
  return p;
}
function templateFlowPlan(plan, { headlineHeight, bodyHeight = 0, hasBody = bodyHeight > 0, ctaHeight = 0, ctaWidth = "fit" }) {
  const f = plan.copyFlow, headlineBottom = plan.title[1] + headlineHeight, bodyY = f ? headlineBottom + (hasBody ? f.headlineBodyGap : 0) : plan.body[1];
  const box = ctaWidth === "poster" ? plan.posterCta : plan.cta;
  const ctaY = ctaWidth === "poster" || plan.footer ? box[1] + box[3] - ctaHeight : f ? (hasBody ? bodyY + bodyHeight : headlineBottom) + f.bodyCtaGap : plan.cta[1];
  return { bodyY, ctaY };
}

// src/font-passports-v3.js
var BUNDLED_FONT_METADATA = {
  "league-spartan-latin-wght-normal.woff2": {
    "sha256": "7d843a9fa4dcd050da68405d9093f8ab8298f8f60a97155e85ab84c9ed3040e2",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        700,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ]
  },
  "source-sans-3-latin-wght-normal.woff2": {
    "sha256": "7a19a7027e125257d310c6dbd78ae3a30b5ea1e3794d60b12bb28227a003bfda",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        809,
        809
      ],
      [
        8201,
        8201
      ],
      [
        8203,
        8203
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ],
      [
        65279,
        65279
      ]
    ]
  },
  "barlow-condensed-latin-800-normal.woff2": {
    "sha256": "2515494e8cc2ca07c86ea78766cfa104b796aa6ed5d66821c01d51dbb0b52bce",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ]
  },
  "archivo-latin-wght-normal.woff2": {
    "sha256": "8f704806dbedeaaeca334b11ec348bc3ac3a439d6431544b3afb54f534ee4967",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        700,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8201,
        8201
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ],
      [
        65279,
        65279
      ]
    ]
  },
  "manrope-latin-wght-normal.woff2": {
    "sha256": "a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972",
    "coverage": [
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ]
  }
};

// src/font-passports-template.js
var TEMPLATE_FONT_METADATA = {
  "lora-latin-wght-normal.woff2": {
    "sha256": "ddb8c66035104e233fc024669183aad3738b6daa16deee2ebb1241bd0f98ace1",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        172
      ],
      [
        174,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 37788
  },
  "space-grotesk-latin-wght-normal.woff2": {
    "sha256": "0640890476fc1198ab4de571fb658de443c4d85b66466ec09534a8737ab1ce9d",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        255
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8201,
        8201
      ],
      [
        8203,
        8203
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 22288
  },
  "dm-sans-latin-wght-normal.woff2": {
    "sha256": "9fea608a947e67020c33cad9a6fe3d60c54119dfb8cff87768a8117a15ed7543",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        172
      ],
      [
        174,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        776
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8593,
        8593
      ],
      [
        8595,
        8595
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 36932
  },
  "oswald-latin-wght-normal.woff2": {
    "sha256": "bd73278ee0c50041b91b4c03d1229e35b501637f46b6409e7da2d3a758446ea5",
    "coverage": [
      [
        13,
        13
      ],
      [
        32,
        126
      ],
      [
        160,
        172
      ],
      [
        174,
        255
      ],
      [
        258,
        258
      ],
      [
        305,
        305
      ],
      [
        338,
        339
      ],
      [
        699,
        700
      ],
      [
        710,
        710
      ],
      [
        730,
        730
      ],
      [
        732,
        732
      ],
      [
        768,
        769
      ],
      [
        771,
        772
      ],
      [
        776,
        777
      ],
      [
        803,
        803
      ],
      [
        8211,
        8212
      ],
      [
        8216,
        8218
      ],
      [
        8220,
        8222
      ],
      [
        8226,
        8226
      ],
      [
        8230,
        8230
      ],
      [
        8242,
        8243
      ],
      [
        8249,
        8250
      ],
      [
        8260,
        8260
      ],
      [
        8364,
        8364
      ],
      [
        8482,
        8482
      ],
      [
        8722,
        8722
      ],
      [
        8725,
        8725
      ]
    ],
    "bytes": 28488
  }
};

// font-pairings.js
var metadata = { ...BUNDLED_FONT_METADATA, ...TEMPLATE_FONT_METADATA };
function freeze4(v) {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze4);
    Object.freeze(v);
  }
  return v;
}
var face = (family, file, range, legacyId) => ({ family, file, range, ...metadata[file], coverage: metadata[file].coverage.map((r) => [...r]), ...legacyId ? { legacyId } : {} });
var faces = {
  spartan: face("League Spartan", "league-spartan-latin-wght-normal.woff2", [100, 900], "studio"),
  source: face("Source Sans 3", "source-sans-3-latin-wght-normal.woff2", [200, 900], "body"),
  barlow: face("Barlow Condensed", "barlow-condensed-latin-800-normal.woff2", [800, 800], "impact"),
  archivo: face("Archivo", "archivo-latin-wght-normal.woff2", [100, 900], "clean"),
  manrope: face("Manrope", "manrope-latin-wght-normal.woff2", [200, 800], "cleanBody"),
  lora: face("Lora", "lora-latin-wght-normal.woff2", [400, 700]),
  space: face("Space Grotesk", "space-grotesk-latin-wght-normal.woff2", [300, 700]),
  dm: face("DM Sans", "dm-sans-latin-wght-normal.woff2", [100, 1e3]),
  oswald: face("Oswald", "oswald-latin-wght-normal.woff2", [200, 700])
};
var pairing = (id, label, description, headline, body, weight) => ({ id, label, description, headline: { ...faces[headline], defaultWeight: weight }, body: { ...faces[body], defaultWeight: 400 }, defaultWeights: { headline: weight, body: 400, cta: 600, kicker: 600, brand: 600 } });
var FONT_PAIRINGS = freeze4([
  pairing("studio", "Bold studio", "League Spartan with Source Sans 3", "spartan", "source", 800),
  pairing("impact", "Compact impact", "Barlow Condensed with Source Sans 3", "barlow", "source", 800),
  pairing("clean", "Clean digital", "Archivo with Manrope", "archivo", "manrope", 800),
  pairing("editorial-serif", "Editorial serif", "Lora with Source Sans 3", "lora", "source", 700),
  pairing("geometric-modern", "Geometric modern", "Space Grotesk with DM Sans", "space", "dm", 700),
  pairing("tall-editorial", "Tall editorial", "Oswald with Manrope", "oswald", "manrope", 700)
]);
function resolveFontPairing(options = {}) {
  const id = Object.hasOwn(options, "fontPairing") ? options.fontPairing : options.voice ?? "studio";
  const result = FONT_PAIRINGS.find((p) => p.id === id);
  if (!result) throw Error("Choose a supported font pairing.");
  return result;
}
function getRoleBundledFont(options = {}, role) {
  const p = resolveFontPairing(options);
  if (!Object.hasOwn(p.defaultWeights, role)) throw Error("Choose a supported typography role.");
  return { ...p[role === "headline" ? "headline" : "body"], pairingId: p.id, defaultWeight: p.defaultWeights[role] };
}

// template-model.js
var clone2 = (value) => JSON.parse(JSON.stringify(value));
var plain2 = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function freeze5(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze5);
    Object.freeze(value);
  }
  return value;
}
var TEMPLATES = freeze5([
  { id: "bold-backdrop", label: "Bold backdrop", description: "Full photographic or solid field, bold copy and a poster-wide action.", version: 1 },
  { id: "subject-right", label: "Subject right", description: "A left reading column with a separate right-hand subject.", version: 1 },
  { id: "image-lead", label: "Image lead", description: "A dominant complete original image with supporting copy.", version: 1 },
  { id: "centered-announcement", label: "Centered announcement", description: "A centered, focused announcement and compact action.", version: 1 },
  { id: "service-sheet", label: "Service sheet", description: "An editorial reading column for detailed service information.", version: 1 },
  { id: "subject-left", label: "Subject left", description: "A left-hand visual with a separate right reading column.", version: 1 },
  { id: "image-footer", label: "Image footer", description: "Copy leads above a substantial lower image zone.", version: 1 },
  { id: "framed-focus", label: "Framed focus", description: "A central contained visual between headline and supporting copy.", version: 1 },
  { id: "type-led", label: "Type-led", description: "A dominant headline with a compact supporting image.", version: 1 },
  { id: "offset-grid", label: "Offset grid", description: "An upper headline and asymmetric lower image-and-copy split.", version: 1 }
]);
var TEMPLATE_DEFAULTS = freeze5({
  composition: { layout: "bold-backdrop", version: 1, density: "balanced", profile: null },
  motif: { id: "none", opacity: 0.15, color: "auto", x: 0.75, y: 0.65, scale: 1, rotation: 0 },
  cta: { style: "strip", width: "poster", align: "left", paddingX: 24, paddingY: 16, fill: { mode: "palette", value: "ink" }, text: { mode: "auto" }, arrow: true },
  textColors: { headline: "auto", body: "auto", brand: "auto", kicker: "auto" },
  layers: { background: { mode: "solid", opacity: 1, blur: 0 }, foreground: { x: 0.66, y: 0.66, scale: 1, rotation: 0, shadow: 0.25, opacity: 1 }, product: { opacity: 1 }, headlineDepth: "front" }
});
var LEGACY_TEMPLATE_IDS = freeze5({ lateral: "subject-right", broadside: "bold-backdrop", cover: "bold-backdrop", specimen: "image-lead", centered: "centered-announcement", spread: "service-sheet" });
function templateId(value) {
  if (TEMPLATES.some((t) => t.id === value)) return value;
  return LEGACY_TEMPLATE_IDS[value] ?? "bold-backdrop";
}
var formats = ["square", "portrait", "story", "landscape"];
function keys2(v, allowed, label) {
  if (!plain2(v)) throw Error(`${label} must be an object.`);
  for (const k of Object.keys(v)) if (!allowed.includes(k)) throw Error(`Unsupported ${label} option: ${k}.`);
}
function number2(v, min, max, label) {
  if (typeof v !== "number" || !Number.isFinite(v) || v < min || v > max) throw Error(`${label} must be between ${min} and ${max}.`);
}
function normalizeTemplateGroup(group, value, partial = false) {
  const defaults = TEMPLATE_DEFAULTS[group];
  if (!defaults) throw Error("Unsupported template group.");
  keys2(value, Object.keys(defaults), `poster ${group}`);
  if (group === "composition") {
    if (Object.hasOwn(value, "layout") && !TEMPLATES.some((t) => t.id === value.layout)) throw Error("Choose a supported template layout.");
    const checked = normalizeFlexibleGroup(group, { ...value, ...Object.hasOwn(value, "layout") ? { layout: "lateral" } : {} }, partial);
    if (Object.hasOwn(value, "layout")) checked.layout = value.layout;
    else if (!partial) checked.layout = defaults.layout;
    return checked;
  }
  if (group === "cta") {
    if (Object.hasOwn(value, "width") && !["fit", "column", "poster"].includes(value.width)) throw Error("Choose a supported template CTA width.");
    const checked = normalizeFlexibleGroup(group, { ...value, ...Object.hasOwn(value, "width") ? { width: value.width === "fit" ? "fit" : "full" } : {} }, true);
    if (Object.hasOwn(value, "width")) checked.width = value.width;
    const result2 = partial ? checked : mergeComposition(defaults, checked);
    if (!partial) {
      normalizeFlexibleGroup("cta", { ...result2, width: result2.width === "fit" ? "fit" : "full" });
      if (value.text?.mode === "auto") result2.text = { mode: "auto" };
    }
    return result2;
  }
  if (group === "layers") {
    const checked = {};
    for (const [name2, spec2] of Object.entries(value)) {
      if (name2 === "headlineDepth") {
        if (!["front", "behind"].includes(spec2)) throw Error("Choose supported headline depth.");
        checked[name2] = spec2;
        continue;
      }
      const bounds = name2 === "background" ? { opacity: [0, 1], blur: [0, 24] } : name2 === "foreground" ? { x: [0, 1], y: [0, 1], scale: [0.4, 2], rotation: [-25, 25], shadow: [0, 1], opacity: [0, 1] } : { opacity: [0, 1] };
      keys2(spec2, [...Object.keys(bounds), ...name2 === "background" ? ["mode"] : []], `template ${name2}`);
      checked[name2] = {};
      for (const [k, v] of Object.entries(spec2)) {
        if (k === "mode") {
          if (!["solid", "image"].includes(v)) throw Error("Choose a supported background mode.");
        } else number2(v, ...bounds[k], `${name2} ${k}`);
        checked[name2][k] = v;
      }
    }
    return partial ? checked : mergeComposition(defaults, checked);
  }
  const result = normalizeFlexibleGroup(group, value, partial);
  if (group === "motif" && Object.hasOwn(result, "id") && result.id !== "none") throw Error("Template motifs must be none.");
  return result;
}
function mapOld(source, hasBackground, partial = false) {
  const out = clone2(source);
  if (source.composition) out.composition = { ...source.composition, ...Object.hasOwn(source.composition, "layout") ? { layout: templateId(source.composition.layout) } : {} };
  if (source.cta) out.cta = { ...source.cta, ...Object.hasOwn(source.cta, "width") ? { width: source.cta.width === "full" ? "column" : source.cta.width } : {} };
  if (!partial || source.motif) out.motif = { ...source.motif ?? {}, id: "none" };
  if (!partial || source.details) out.details = { ...source.details ?? {}, motif: "none", surface: "flat", underline: false };
  if (!partial || source.recipe !== void 0 || source.layers?.background) out.layers = { ...source.layers, background: { ...source.layers?.background, ...!partial || source.recipe !== void 0 ? { mode: source.recipe === "editorial" ? "solid" : hasBackground ? "image" : "solid" } : {} } };
  return out;
}
function upgradePosterTemplate(options = {}, hasBackground = false) {
  const old = normalizePoster(options);
  if (old.compilerVersion === 4) return old;
  const flexible = upgradePosterFlexible(old), next = mapOld(flexible, hasBackground);
  if (flexible.formats) next.formats = Object.fromEntries(Object.entries(flexible.formats).map(([f, p]) => [f, mapOld(p, hasBackground, true)]));
  const upgraded = normalizePoster({ ...next, version: 3, compilerVersion: 4 }), result = clone2(upgraded);
  const fit = (o, f) => {
    const t = o.layers.foreground;
    return t.x === 0.66 && t.y === 0.66 ? { ...t, ...(({ x, y }) => ({ x, y }))(templateForegroundPlacement(o.composition.layout, f, o.composition.density)) } : t;
  };
  result.layers.foreground = fit(upgraded, "square");
  result.formats = { ...result.formats };
  for (const f of formats) {
    const o = resolvePoster(upgraded, f);
    if (f === "square" && !upgraded.formats?.square) continue;
    result.formats[f] = { ...result.formats[f], layers: { ...result.formats[f]?.layers, foreground: fit(o, f) } };
  }
  return normalizePoster(result);
}
function roleReset(typography) {
  return Object.fromEntries(Object.entries(typography).map(([role, spec2]) => [role, { ...spec2, size: null, lineHeight: null }]));
}
function templateForegroundPlacement(id, format = "square", density = "balanced") {
  const { visual: [x, y, w, h] } = templatePlan(id, format, density), height = { square: 1080, portrait: 1350, story: 1920, landscape: 565.2 }[format];
  return { x: (x + w / 2) / 1080, y: (y + h / 2) / height, scale: 1, rotation: 0 };
}
function selection(o, id, format = "square") {
  const width = id === "bold-backdrop" ? "poster" : ["image-lead", "centered-announcement"].includes(id) ? "fit" : "column";
  return { composition: { ...o.composition, layout: id }, motif: { ...o.motif, id: "none" }, layers: { ...o.layers, foreground: { ...o.layers.foreground, ...templateForegroundPlacement(id, format, o.composition.density) } }, typography: roleReset(o.typography), scale: 1, cta: { ...o.cta, style: id === "bold-backdrop" ? "strip" : o.cta.style, width, align: id === "centered-announcement" ? "center" : "left", paddingX: 24, paddingY: 16 }, details: { ...o.details, motif: "none", surface: "flat", underline: false } };
}
function applyTemplate(poster, id, format = "square", allFormats = false, hasBackground = false) {
  if (!TEMPLATES.some((t) => t.id === id)) throw Error("Choose a supported template layout.");
  if (!formats.includes(format)) throw Error("Choose a supported poster format.");
  const p = upgradePosterTemplate(poster, hasBackground), selected = selection(resolvePoster(p, format), id, format);
  if (!allFormats) return normalizePoster({ ...p, formats: { ...p.formats, [format]: { ...p.formats?.[format], ...selected } } });
  const root = selection({ ...p, typography: p.typography, cta: p.cta }, id), next = { ...p, ...root };
  if (p.formats) {
    next.formats = {};
    for (const [f, overrides] of Object.entries(p.formats)) {
      const q = clone2(overrides);
      delete q.composition;
      delete q.motif;
      delete q.scale;
      if (q.typography) for (const spec2 of Object.values(q.typography)) {
        delete spec2.size;
        delete spec2.lineHeight;
      }
      if (q.cta) for (const key of ["style", "width", "align", "paddingX", "paddingY"]) delete q.cta[key];
      if (q.details) for (const key of ["surface", "motif", "underline"]) delete q.details[key];
      const prune = (value) => {
        for (const [key, v] of Object.entries(value)) {
          if (plain2(v)) {
            prune(v);
            if (!Object.keys(v).length) delete value[key];
          }
        }
      };
      prune(q);
      if (Object.keys(q).length) next.formats[f] = q;
    }
  }
  next.formats ??= {};
  for (const f of ["portrait", "story", "landscape"]) {
    const q = next.formats[f] ?? {};
    next.formats[f] = { ...q, layers: { ...q.layers, foreground: { ...q.layers?.foreground, ...templateForegroundPlacement(id, f, next.composition.density) } } };
  }
  if (next.formats.square?.layers?.foreground) Object.assign(next.formats.square.layers.foreground, templateForegroundPlacement(id, "square", next.composition.density));
  return normalizePoster(next);
}

// poster-model.js
var DEFAULT_POSTER = Object.freeze({
  version: 2,
  recipe: "hero",
  voice: "studio",
  treatment: "brand",
  variation: "balanced",
  emphasis: "",
  kicker: "",
  scale: 1,
  heroScale: 1,
  cropX: 0.5,
  cropY: 0.5,
  alignment: "left"
});
var enums = {
  recipe: ["hero", "showcase", "editorial"],
  voice: ["studio", "impact", "clean"],
  treatment: ["brand", "light", "dark"],
  variation: ["balanced", "type-led", "image-led"],
  alignment: ["left", "center"]
};
var ranges = { scale: [0.85, 1.15], heroScale: [0.8, 1.2], cropX: [0, 1], cropY: [0, 1] };
var formats2 = ["square", "portrait", "story", "landscape"];
var object = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
function fields(options, partial) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const result = partial ? {} : { ...DEFAULT_POSTER };
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "version" && !partial) {
      if (value !== 2) throw new Error("Poster version must be 2.");
    } else if (enums[key]) {
      if (!enums[key].includes(value)) throw new Error(`Choose a supported poster ${key}.`);
    } else if (ranges[key]) {
      const [min, max] = ranges[key];
      if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error(`Poster ${key} must be between ${min} and ${max}.`);
    } else if (key === "emphasis" || key === "kicker") {
      if (typeof value !== "string" || value.length > 4e3) throw new Error(`Poster ${key} must be text of at most 4000 characters.`);
    } else throw new Error(`Unsupported poster option: ${key}.`);
    result[key] = value;
  }
  return result;
}
function normalizePoster(options = {}) {
  if (options?.version === 3) return normalizePosterV3(options);
  const result = fields(options, false);
  if (Object.hasOwn(options, "formats")) {
    if (!object(options.formats)) throw new Error("Poster formats must be an object.");
    result.formats = {};
    for (const [format, overrides] of Object.entries(options.formats)) {
      if (!formats2.includes(format)) throw new Error("Choose a supported poster format.");
      result.formats[format] = fields(overrides, true);
    }
  }
  return result;
}
var roles = ["headline", "body", "cta", "kicker", "brand"];
var roleSizes = { headline: [48, 260], body: [20, 84], cta: [20, 72], kicker: [18, 64], brand: [20, 64] };
var roleDefault = () => ({ fontId: "", weight: null, size: null, lineHeight: null, tracking: 0 });
function freezeDeep(value) {
  for (const child of Object.values(value)) if (object(child)) freezeDeep(child);
  return Object.freeze(value);
}
var DEFAULT_POSTER_V3 = freezeDeep({
  ...DEFAULT_POSTER,
  version: 3,
  typography: Object.fromEntries(roles.map((role) => [role, roleDefault()])),
  layers: { background: { opacity: 0.35, blur: 0 }, foreground: { x: 0.66, y: 0.66, scale: 1, rotation: 0, shadow: 0.25 }, headlineDepth: "front" },
  details: { motif: "none", text: "", surface: "flat", strength: 0.25, action: "rail", underline: true }
});
var copy = (value) => JSON.parse(JSON.stringify(value));
function bounded(value, min, max, key) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error(`Poster ${key} must be between ${min} and ${max}.`);
}
function nested(value, allowed, label, validate) {
  if (!object(value)) throw new Error(`Poster ${label} must be an object.`);
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (!allowed.includes(key)) throw new Error(`Unsupported poster ${label} option: ${key}.`);
    result[key] = validate(key, item);
  }
  return result;
}
function v3Fields(options, partial = false) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const result = partial ? {} : copy(DEFAULT_POSTER_V3);
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "version" && !partial) {
      if (value !== 3) throw new Error("Poster version must be 3.");
      result.version = 3;
    } else if (key === "compilerVersion") {
      if (partial || value !== 2) throw new Error("Poster compilerVersion must be 2 at the poster root only.");
      result.compilerVersion = 2;
    } else if (key === "typography") {
      const typed = nested(value, roles, key, (role, spec2) => nested(spec2, ["fontId", "weight", "size", "lineHeight", "tracking"], role, (field, item) => {
        if (field === "fontId") {
          if (typeof item !== "string" || !/^[A-Za-z0-9:_-]{0,100}$/.test(item)) throw new Error("Invalid poster font identifier.");
        } else if (field === "tracking") bounded(item, -0.04, 0.2, field);
        else if (item !== null) {
          const limits = field === "weight" ? [100, 900] : field === "lineHeight" ? [0.85, 2] : roleSizes[role];
          bounded(item, ...limits, field);
          if (field === "weight" && !Number.isInteger(item)) throw new Error("Poster font weight must be an integer.");
        }
        return item;
      }));
      result.typography = partial ? typed : merge(result.typography, typed);
    } else if (key === "layers") {
      const layer = nested(value, ["background", "foreground", "headlineDepth"], key, (name2, spec2) => {
        if (name2 === "headlineDepth") {
          if (!["front", "behind"].includes(spec2)) throw new Error("Choose supported headline depth.");
          return spec2;
        }
        const bounds = name2 === "background" ? { opacity: [0, 1], blur: [0, 24] } : { x: [0, 1], y: [0, 1], scale: [0.4, 2], rotation: [-25, 25], shadow: [0, 1] };
        return nested(spec2, Object.keys(bounds), name2, (field, item) => {
          bounded(item, ...bounds[field], field);
          return item;
        });
      });
      result.layers = partial ? layer : merge(result.layers, layer);
    } else if (key === "details") {
      const details = nested(value, ["motif", "text", "surface", "strength", "action", "underline"], key, (field, item) => {
        const choices = { motif: ["none", "ribbon", "orbit"], surface: ["flat", "tonal"], action: ["rail", "capsule", "text"] };
        if (choices[field] && !choices[field].includes(item)) throw new Error(`Choose supported detail ${field}.`);
        if (field === "text" && (typeof item !== "string" || item.length > 160)) throw new Error("Detail text must be at most 160 characters.");
        if (field === "strength") bounded(item, 0, 1, field);
        if (field === "underline" && typeof item !== "boolean") throw new Error("Detail underline must be boolean.");
        return item;
      });
      result.details = partial ? details : merge(result.details, details);
    } else Object.assign(result, fields({ [key]: value }, true));
  }
  return result;
}
function merge(base, partial) {
  const result = copy(base);
  for (const [key, value] of Object.entries(partial)) result[key] = object(value) && object(result[key]) ? merge(result[key], value) : copy(value);
  return result;
}
function normalizePosterV3(options = {}) {
  if (options?.compilerVersion === 4) return normalizePosterTemplate(options);
  if (options?.compilerVersion === 3) return normalizePosterFlexible(options);
  const result = v3Fields(options);
  if (Object.hasOwn(options, "formats")) result.formats = nested(options.formats, formats2, "formats", (_format, value) => v3Fields(value, true));
  return result;
}
function resolvePoster(options = {}, format) {
  const base = normalizePoster(options), override = base.formats?.[format] ?? {};
  return [3, 4].includes(base.compilerVersion) ? mergeComposition(base, override) : base.version === 3 ? merge(base, override) : { ...base, ...override };
}
var DEFAULT_POSTER_FLEX = freezeDeep({ ...copy(DEFAULT_POSTER_V3), compilerVersion: 3, ...copy(FLEX_GROUP_DEFAULTS) });
function flexibleFields(options, partial = false) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const old = {}, groups = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "compilerVersion") {
      if (partial || value !== 3) throw new Error("Poster compilerVersion must be 3 at the poster root only.");
    } else if (Object.hasOwn(FLEX_GROUP_DEFAULTS, key)) groups[key] = normalizeFlexibleGroup(key, value, true);
    else old[key] = value;
  }
  const result = v3Fields(old, partial);
  if (!partial) Object.assign(result, copy(FLEX_GROUP_DEFAULTS), { compilerVersion: 3 });
  for (const [key, value] of Object.entries(groups)) result[key] = partial ? value : normalizeFlexibleGroup(key, value);
  return result;
}
function normalizePosterFlexible(options) {
  const result = flexibleFields(options);
  if (Object.hasOwn(options, "formats")) result.formats = nested(options.formats, formats2, "formats", (_format, value) => flexibleFields(value, true));
  for (const override of Object.values(result.formats ?? {})) {
    const resolved = mergeComposition(result, override);
    for (const key of Object.keys(FLEX_GROUP_DEFAULTS)) normalizeFlexibleGroup(key, resolved[key]);
  }
  return result;
}
function templateFields(options, partial = false) {
  if (!object(options)) throw new Error("Poster options must be an object.");
  const old = {}, groups = {}, scalars = {};
  for (const [key, value] of Object.entries(options)) {
    if (key === "formats" && !partial) continue;
    if (key === "compilerVersion") {
      if (partial || value !== 4) throw new Error("Poster compilerVersion must be 4 at the poster root only.");
    } else if (key === "fontPairing") {
      resolveFontPairing({ fontPairing: value });
      scalars.fontPairing = value;
    } else if (Object.hasOwn(TEMPLATE_DEFAULTS, key)) groups[key] = normalizeTemplateGroup(key, value, true);
    else old[key] = value;
  }
  const result = v3Fields(old, partial);
  if (!partial) Object.assign(result, copy(TEMPLATE_DEFAULTS), { compilerVersion: 4 });
  Object.assign(result, scalars);
  for (const [key, value] of Object.entries(groups)) result[key] = partial ? value : normalizeTemplateGroup(key, value);
  if (result.details?.surface === "tonal" || result.details?.motif !== void 0 && result.details.motif !== "none") throw new Error("Templates require flat surface and no legacy motif.");
  return result;
}
function normalizePosterTemplate(options) {
  const result = templateFields(options);
  if (Object.hasOwn(options, "formats")) result.formats = nested(options.formats, formats2, "formats", (_format, value) => templateFields(value, true));
  for (const override of Object.values(result.formats ?? {})) {
    const resolved = mergeComposition(result, override);
    for (const key of Object.keys(TEMPLATE_DEFAULTS)) normalizeTemplateGroup(key, resolved[key]);
  }
  return result;
}
function upgradePosterFlexible(options = {}) {
  const previous = normalizePoster(options);
  if (previous.compilerVersion === 3) return previous;
  const map = (source) => {
    const out = copy(source);
    if (source.details?.motif !== void 0) out.motif = { id: { none: "none", ribbon: "ribbon-v1", orbit: "orbit-v1" }[source.details.motif] };
    if (source.details?.strength !== void 0) out.motif = { ...out.motif, opacity: 0.25 + 0.65 * source.details.strength };
    if (source.details?.action !== void 0) out.cta = { style: { rail: "strip", capsule: "pill", text: "text" }[source.details.action] };
    return out;
  };
  const upgraded = map(previous);
  if (previous.formats) upgraded.formats = Object.fromEntries(Object.entries(previous.formats).map(([format, value]) => [format, map(value)]));
  return normalizePoster({ ...upgraded, version: 3, compilerVersion: 3 });
}

// motif-resources.js
var resources = {
  "ribbon-v1": {
    "id": "ribbon-v1",
    "version": 1,
    "sha256": "4e5fe18d3804fb9893f8e322ac704c5b02f6c695f6aa77ec351e9ca6ab6b2f46",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="ribbon-v1-title ribbon-v1-desc">\n  <title id="ribbon-v1-title">Continuous ribbon</title>\n  <desc id="ribbon-v1-desc">An open folded ribbon suggesting creative continuity.</desc>\n  <g id="ribbon-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M72 344 C170 100 294 100 374 290 S550 492 650 282 S806 104 928 190" stroke-width="48"/></g>\n</svg>\n'
  },
  "orbit-v1": {
    "id": "orbit-v1",
    "version": 1,
    "sha256": "83ee4c54d3adb92bc52078c5274ee64b49ee3a1ec02c5b10e450272a5c2d6770",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="orbit-v1-title orbit-v1-desc">\n  <title id="orbit-v1-title">Intersecting orbits</title>\n  <desc id="orbit-v1-desc">Three open orbital rings suggesting connected perspectives.</desc>\n  <g id="orbit-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="500" cy="300" rx="390" ry="134" transform="rotate(-24 500 300)"/><ellipse cx="500" cy="300" rx="330" ry="190" transform="rotate(24 500 300)"/><circle cx="500" cy="300" r="40"/></g>\n</svg>\n'
  },
  "proof-marks-v1": {
    "id": "proof-marks-v1",
    "version": 1,
    "sha256": "d6f0339bd152cf1110828294fcf3762614e0ae0b4c71eb246116f279797525f9",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="proof-marks-v1-title proof-marks-v1-desc">\n  <title id="proof-marks-v1-title">Proof marks</title>\n  <desc id="proof-marks-v1-desc">Open crop corners and offset registration crosses expressing editorial craft, not approval or proof of a claim.</desc>\n  <g id="proof-marks-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M272 118 H128 V256 M728 118 H872 V256 M128 354 V492 H272 M872 354 V492 H728 M446 240 H510 M478 208 V272 M530 328 H594 M562 296 V360"/></g>\n</svg>\n'
  },
  "responsive-frames-v1": {
    "id": "responsive-frames-v1",
    "version": 1,
    "sha256": "539cfa9e1d288ba25231682cef8c6be3d347df2335a0cb4e82a0b7030c9e2243",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="responsive-frames-v1-title responsive-frames-v1-desc">\n  <title id="responsive-frames-v1-title">Responsive frames</title>\n  <desc id="responsive-frames-v1-desc">Three nested device-independent frames expressing adaptable design.</desc>\n  <g id="responsive-frames-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><rect x="98" y="110" width="700" height="370" rx="14"/><rect x="400" y="176" width="384" height="292" rx="12"/><rect x="728" y="244" width="174" height="246" rx="18"/><path d="M132 150 H356 M760 450 H870"/></g>\n</svg>\n'
  },
  "answer-exchange-v1": {
    "id": "answer-exchange-v1",
    "version": 1,
    "sha256": "31c39e657bb47fcdb19aa10f9986397aa9082cb350368fb5abeb97897d444dc8",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="answer-exchange-v1-title answer-exchange-v1-desc">\n  <title id="answer-exchange-v1-title">Answer exchange</title>\n  <desc id="answer-exchange-v1-desc">Two open conversation forms connected in an exchange of questions and answers, without invented interface text.</desc>\n  <g id="answer-exchange-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M560 120 H110 V328 H230 V416 L338 328 H604 V226 M666 210 H890 V432 H804 V506 L706 432 H466 V384"/></g>\n</svg>\n'
  },
  "research-folio-v1": {
    "id": "research-folio-v1",
    "version": 1,
    "sha256": "41576f4361fa4f3cc06adba7435627e2f334bfad97ab7a2d114405a27e3a7e8d",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="research-folio-v1-title research-folio-v1-desc">\n  <title id="research-folio-v1-title">Research folio</title>\n  <desc id="research-folio-v1-desc">Overlapping document sheets and a magnifying lens representing inquiry, not a chart.</desc>\n  <g id="research-folio-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M188 112 L604 76 L636 444 L220 480 Z M290 154 H710 V502 H290 Z M350 216 H598 M350 270 H550 M350 324 H472"/><circle cx="688" cy="370" r="106"/><path d="M764 446 L870 532"/></g>\n</svg>\n'
  },
  "decision-junction-v1": {
    "id": "decision-junction-v1",
    "version": 1,
    "sha256": "c917b5d3fc3f850b7d6d2d28825ea7e3fcd6bd9c12dada64971c9e2728a0aab4",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="decision-junction-v1-title decision-junction-v1-desc">\n  <title id="decision-junction-v1-title">Decision junction</title>\n  <desc id="decision-junction-v1-desc">A source path branches to two equal destinations without invented scores.</desc>\n  <g id="decision-junction-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><path d="M152 300 H400 M500 300 H668 V144 H844 M668 300 V456 H844"/><path d="M400 300 L450 250 L500 300 L450 350 Z"/><circle cx="120" cy="300" r="32"/><rect x="844" y="112" width="64" height="64" rx="8"/><rect x="844" y="424" width="64" height="64" rx="8"/></g>\n</svg>\n'
  },
  "interface-modules-v1": {
    "id": "interface-modules-v1",
    "version": 1,
    "sha256": "8c830f5d9fd52e5566acfd98d2ae854c4251c33a9dffa9ef24635902e495367b",
    "viewBox": "0 0 1000 600",
    "svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="1000" height="600" role="img" aria-labelledby="interface-modules-v1-title interface-modules-v1-desc">\n  <title id="interface-modules-v1-title">Interface modules</title>\n  <desc id="interface-modules-v1-desc">Three equal outlined conceptual system modules joined by short explicit ports, without faux interface chrome or text.</desc>\n  <g id="interface-modules-v1-geometry" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><rect x="96" y="190" width="224" height="220" rx="8"/><rect x="388" y="190" width="224" height="220" rx="8"/><rect x="680" y="190" width="224" height="220" rx="8"/><path d="M320 300 H388 M612 300 H680"/></g>\n</svg>\n'
  }
};
for (const record of Object.values(resources)) Object.freeze(record);
var MOTIF_RESOURCES = Object.freeze(resources);

// model.js
var FORMATS = ["square", "portrait", "story", "landscape"];
var DIRECTIONS = ["spotlight", "offer", "lifestyle"];
var CAMPAIGN_STATUSES = ["draft", "active", "paused", "completed", "archived"];
var POST_STATUSES = ["planned", "design-ready", "reviewed", "exported", "posted"];
var JOB_STATUSES = ["queued", "running", "succeeded", "failed", "unknown"];
var BUSY = ["queued", "running", "unknown"];
var StudioError = class extends Error {
  constructor(message, code = "invalid") {
    super(message);
    this.name = "StudioError";
    this.code = code;
  }
};
function check(condition, message, code) {
  if (!condition) throw new StudioError(message, code);
}
var plain3 = (value) => value !== null && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
var clone3 = (value) => JSON.parse(JSON.stringify(value));
function stableJSON(value) {
  return JSON.stringify(value, (_key, item) => plain3(item) ? Object.fromEntries(Object.keys(item).sort().map((key) => [key, item[key]])) : item);
}
function text(value, label, max = 4e3, required = false) {
  check(value === void 0 || typeof value === "string", `${label} must be text.`);
  const result = (value ?? "").trim();
  check(result.length <= max, `${label} is too long (maximum ${max} characters).`);
  check(!required || result.length > 0, `${label} is required.`);
  return result;
}
function choice(value, values, label, fallback) {
  const result = value ?? fallback;
  check(values.includes(result), `Choose a supported ${label}.`);
  return result;
}
function cropPosition(value) {
  check(typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1, "Crop position must be between 0 and 1.");
  return value;
}
function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T12:00:00Z`)) && (/* @__PURE__ */ new Date(`${value}T12:00:00Z`)).toISOString().slice(0, 10) === value;
}
function date(value, label, optional = true) {
  if (optional && (value === void 0 || value === "")) return "";
  check(isDate(value), `${label} must be a valid date (YYYY-MM-DD).`);
  return value;
}
function timezone(value) {
  const result = text(value, "Time zone", 100) || "UTC";
  try {
    new Intl.DateTimeFormat("en", { timeZone: result }).format();
  } catch {
    throw new StudioError("Choose a valid IANA time zone.");
  }
  return result;
}
function localDate(zone = "UTC", now = (/* @__PURE__ */ new Date()).toISOString()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(now));
  const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
function createState() {
  return { version: 1, revision: 0, companies: [], campaigns: [], plans: [], posts: [], designs: [], jobs: [], assets: [], settings: { model: "gpt-image-2.6-flare" } };
}
function validateModel(value) {
  check(typeof value === "string" && /^gpt-image-[A-Za-z0-9._-]{1,64}$/.test(value), "Use a GPT Image model identifier, such as gpt-image-1.");
  return value;
}
function get(state, collection, id) {
  check(typeof id === "string" && id.length > 0, "An item identifier is required.");
  const item = state[collection].find((row) => row.id === id);
  check(item, "The selected item no longer exists.", "not-found");
  return item;
}
function companyOf(state, id, active = true) {
  const company = get(state, "companies", id);
  check(!active || !company.archived, "This company is archived.");
  return company;
}
function campaignOf(state, id, companyId) {
  const campaign = get(state, "campaigns", id);
  check(campaign.companyId === companyId, "This campaign belongs to another company.", "ownership");
  return campaign;
}
function ownedAssets(state, ids, companyId) {
  check(Array.isArray(ids) && ids.length <= 12 && ids.every((id) => typeof id === "string"), "Choose up to 12 company images.");
  for (const id of ids) check(get(state, "assets", id).companyId === companyId, "An image belongs to another company.", "ownership");
  return [...new Set(ids)];
}
function posterOptions(value) {
  try {
    return normalizePoster(value);
  } catch (error) {
    throw new StudioError(error.message);
  }
}
function brandKit(value) {
  check(plain3(value), "Brand kit must be an object.");
  check(Object.keys(value).every((key) => ["voice", "accent", "ink", "paper", "poster"].includes(key)), "Unsupported brand kit option.");
  const result = {};
  if (value.voice !== void 0) result.voice = choice(value.voice, ["studio", "impact", "clean"], "brand voice");
  for (const key of ["accent", "ink", "paper"]) if (Object.hasOwn(value, key)) {
    check(typeof value[key] === "string" && /^#[0-9a-fA-F]{6}$/.test(value[key]), "Choose a six-digit brand kit colour.");
    result[key] = value[key];
  }
  if (value.poster !== void 0) {
    check(value.poster?.version === 3, "Brand poster must use version 3.");
    result.poster = posterOptions(value.poster);
  }
  return result;
}
function storedPoster(value) {
  check(plain3(value) && [2, 3].includes(value.version), "Invalid stored poster version.");
  return posterOptions(value);
}
function compositionProfile(value) {
  try {
    return normalizeCompositionProfile(value);
  } catch (error) {
    throw new StudioError(error.message);
  }
}
function inheritedTemplatePoster(source) {
  const poster = upgradePosterTemplate(source);
  const generic = (t) => t.x === 0.66 && t.y === 0.66 && t.scale === 1 && t.rotation === 0;
  const fit = (o, format) => {
    const t = o.layers.foreground;
    if (!generic(t)) return t;
    const { x, y } = templateForegroundPlacement(o.composition.layout, format, o.composition.density);
    return { ...t, x, y };
  };
  const result = clone3(poster);
  result.layers.foreground = fit(poster, "square");
  for (const format of FORMATS) {
    const original = resolvePoster(poster, format), wanted = fit(original, format), current = resolvePoster(result, format).layers.foreground;
    if (wanted.x === current.x && wanted.y === current.y) continue;
    result.formats ??= {};
    const overrides = result.formats[format] ?? {};
    result.formats[format] = { ...overrides, layers: { ...overrides.layers, foreground: { ...overrides.layers?.foreground, x: wanted.x, y: wanted.y } } };
  }
  return posterOptions(result);
}
function inheritedPoster(state, company, campaign) {
  if (campaign?.artDirection !== void 0) return inheritedTemplatePoster(campaign.artDirection);
  const supplied = company.brandKit?.poster;
  let poster = supplied ? inheritedTemplatePoster(supplied) : applyTemplate(posterOptions({ version: 3, compilerVersion: 4, voice: company.brandKit?.voice ?? "studio" }), "bold-backdrop", "square", true);
  if (company.compositionProfile !== void 0) {
    const profile = compositionProfile(company.compositionProfile), ordinal = profile.vary ? state.compositionCursors?.[company.id] ?? 0 : 0;
    const index = profile.vary ? ordinal : 0, layout = templateId(profile.layouts[index % profile.layouts.length]);
    poster = applyTemplate(poster, layout, "square", true);
    poster.composition = { ...poster.composition, density: profile.density, profile: { id: profile.id, version: 1, sha256: compositionProfileSha256(profile), ordinal } };
    poster.cta = { ...clone3(profile.cta), width: profile.cta.width === "full" ? "column" : profile.cta.width };
    poster = posterOptions(poster);
    if (profile.vary) {
      check(ordinal < Number.MAX_SAFE_INTEGER, "Composition rotation is full.");
      state.compositionCursors ??= {};
      state.compositionCursors[company.id] = ordinal + 1;
    }
  }
  return poster;
}
function trustedResources(poster, format) {
  const options = resolvePoster(poster, format), layout = (options.compilerVersion === 4 ? TEMPLATE_RESOURCES : LAYOUT_RESOURCES)[options.composition.layout];
  const source = options.motif.id === "none" ? null : MOTIF_RESOURCES[options.motif.id];
  check(layout && (options.motif.id === "none" || source), "Missing trusted composition resource.");
  return clone3({ layout, motif: source ? { id: source.id, version: source.version, sha256: source.sha256, viewBox: source.viewBox } : { id: "none", version: 1, sha256: null, viewBox: null } });
}
function assetForRole(state, assetId, companyId, roles2) {
  check(typeof assetId === "string", "Choose an image identifier.");
  if (!assetId) return "";
  const asset = get(state, "assets", assetId);
  check(asset.companyId === companyId, "An image belongs to another company.", "ownership");
  check(roles2.includes(asset.role), "Choose an image with the matching asset role.");
  return assetId;
}
function effectiveAssets(state, company, post, input = {}) {
  const selected = post.assetIds.map((id) => get(state, "assets", id));
  return {
    assetId: assetForRole(state, input.assetId !== void 0 ? input.assetId : post.backgroundAssetId ?? "", company.id, post.poster?.version === 3 ? ["generated", "backdrop"] : ["generated"]),
    logoAssetId: assetForRole(state, input.logoAssetId !== void 0 ? input.logoAssetId : selected.find((a) => a.role === "logo")?.id ?? company.logoAssetId ?? "", company.id, ["logo"]),
    ...post.poster?.version === 3 ? { foregroundAssetId: assetForRole(state, input.foregroundAssetId !== void 0 ? input.foregroundAssetId : post.foregroundAssetId ?? "", company.id, ["foreground", "product"]) } : {},
    productAssetId: assetForRole(state, input.productAssetId !== void 0 ? input.productAssetId : selected.find((a) => a.role === "product")?.id ?? "", company.id, ["product"])
  };
}
function sceneFor(company, post, assets, fonts = []) {
  const version = post.poster?.version === 3 ? 3 : 2;
  return clone3({ version, rendererVersion: version, ...[2, 3, 4].includes(post.poster?.compilerVersion) ? { compilerVersion: post.poster.compilerVersion } : {}, company, post: { ...post, ...assets, backgroundAssetId: assets.assetId }, ...version === 3 ? { fonts } : {}, ...[3, 4].includes(post.poster?.compilerVersion) ? { resources: trustedResources(post.poster, post.format) } : {} });
}
function currentDesign(state, design, post) {
  if (!design.scene) return !post.poster;
  const frozen = design.scene.post, company = get(state, "companies", post.companyId);
  if (design.scene.version === 3) {
    if (stableJSON(design.scene.fonts) !== stableJSON(selectedFonts(state, post))) return false;
    const assets = effectiveAssets(state, company, post);
    if (Object.entries(assets).some(([key, value]) => design[key] !== value)) return false;
  }
  return stableJSON(["name", "description", "color", "guidelines", "brandKit", "logoAssetId"].map((key) => design.scene.company[key] ?? null)) === stableJSON(["name", "description", "color", "guidelines", "brandKit", "logoAssetId"].map((key) => company[key] ?? null)) && ["headline", "body", "cta", "format", "direction"].every((key) => frozen[key] === post[key]) && stableJSON(frozen.poster) === stableJSON(post.poster) && JSON.stringify(frozen.assetIds) === JSON.stringify(post.assetIds) && (!design.sourceContent || design.sourceContent === postContent(post));
}
function postContent(post) {
  const keys3 = ["title", "brief", "headline", "body", "cta", "format", "direction", "intendedDate", "assetIds", "poster", "backgroundAssetId"];
  if (post.poster?.version === 3) keys3.push("foregroundAssetId");
  if (post.cropX !== void 0) keys3.push("cropX");
  return stableJSON(keys3.map((key) => ["backgroundAssetId", "foregroundAssetId"].includes(key) ? post[key] ?? "" : post[key] ?? null));
}
function upsert(rows2, row) {
  const index = rows2.findIndex((r) => r.id === row.id);
  if (index < 0) rows2.push(row);
  else rows2[index] = row;
}
function changed(state) {
  state.revision += 1;
  validateState(state);
  return state;
}
function validateState(state) {
  check(plain3(state) && state.version === 1 && Number.isSafeInteger(state.revision) && state.revision >= 0, "Stored studio data has an unsupported format.");
  for (const key of ["companies", "campaigns", "plans", "posts", "designs", "jobs", "assets"]) {
    check(Array.isArray(state[key]) && state[key].length <= 2e4, `Invalid stored ${key}.`);
    const ids = /* @__PURE__ */ new Set();
    for (const row of state[key]) {
      check(plain3(row) && typeof row.id === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(row.id) && !ids.has(row.id), `Invalid or repeated ${key} identifier.`);
      ids.add(row.id);
    }
  }
  if (state.compositionCursors !== void 0) {
    check(plain3(state.compositionCursors) && Object.keys(state.compositionCursors).length <= state.companies.length, "Invalid composition cursors.");
    for (const [companyId, ordinal] of Object.entries(state.compositionCursors)) {
      check(state.companies.some((c) => c.id === companyId) && !["__proto__", "constructor", "prototype"].includes(companyId), "Invalid composition cursor company.");
      check(Number.isSafeInteger(ordinal) && ordinal >= 0, "Invalid composition cursor ordinal.");
    }
  }
  if (state.fonts !== void 0) {
    check(Array.isArray(state.fonts) && state.fonts.length <= 2e4, "Invalid stored fonts.");
    const ids = /* @__PURE__ */ new Set(), binaries = new Set(state.assets.map((a) => a.id));
    for (const font of state.fonts) {
      validateFontRecord(font);
      companyOf(state, font.companyId, false);
      check(!ids.has(font.id), "Repeated font identifier.");
      ids.add(font.id);
      for (const face2 of font.faces) {
        check(!binaries.has(face2.assetId), "Font binary identifier already belongs to another asset.");
        binaries.add(face2.assetId);
      }
    }
    for (const company of state.companies) check(state.fonts.filter((f) => f.companyId === company.id).length <= 24, "A company can import at most 24 font families.");
  }
  check(plain3(state.settings), "Invalid settings.");
  validateModel(state.settings.model);
  for (const c of state.companies) {
    text(c.name, "Company name", 160, true);
    text(c.description, "Description");
    text(c.guidelines, "Guidelines", 12e3);
    timezone(c.timezone);
    check(Number.isInteger(c.weekStart) && c.weekStart >= 0 && c.weekStart <= 6, "Invalid week-start day.");
    check(typeof c.archived === "boolean", "Invalid company state.");
    check(typeof c.color === "string" && /^#[0-9a-fA-F]{6}$/.test(c.color), "Choose a six-digit brand colour.");
    if (c.logoAssetId) ownedAssets(state, [c.logoAssetId], c.id);
    if (c.brandKit !== void 0) {
      brandKit(c.brandKit);
      validatePosterFonts(state, c.brandKit.poster, c.id);
    }
    if (Object.hasOwn(c, "compositionProfile")) compositionProfile(c.compositionProfile);
  }
  for (const c of state.campaigns) {
    companyOf(state, c.companyId, false);
    text(c.name, "Campaign name", 160, true);
    text(c.goal, "Campaign goal", 4e3, true);
    for (const field of ["audience", "offer", "cta", "style"]) text(c[field], field, 4e3);
    if (c.artDirection !== void 0) {
      storedPoster(c.artDirection);
      validatePosterFonts(state, c.artDirection, c.companyId);
    }
    date(c.offerExpiry, "Offer expiry");
    choice(c.status, CAMPAIGN_STATUSES, "campaign status");
    check(Number.isInteger(c.postsPerWeek) && c.postsPerWeek >= 1 && c.postsPerWeek <= 8, "Choose 1\u20138 posts per week.");
  }
  const weeks = /* @__PURE__ */ new Set();
  for (const p of state.plans) {
    campaignOf(state, p.campaignId, p.companyId);
    date(p.week, "Week", false);
    text(p.focus, "Weekly focus");
    const key = `${p.campaignId}/${p.week}`;
    check(!weeks.has(key), "Duplicate weekly plan.");
    weeks.add(key);
  }
  for (const p of state.posts) {
    companyOf(state, p.companyId, false);
    if (p.campaignId) campaignOf(state, p.campaignId, p.companyId);
    if (p.planId) {
      const plan = get(state, "plans", p.planId);
      check(plan.companyId === p.companyId && plan.campaignId === p.campaignId, "Post plan belongs to another campaign.", "ownership");
    }
    for (const field of ["title", "brief", "headline", "body", "cta"]) text(p[field], field, field === "brief" ? 12e3 : 4e3);
    choice(p.format, FORMATS, "post format");
    choice(p.direction, DIRECTIONS, "design direction");
    choice(p.status, POST_STATUSES, "post status");
    if (p.poster !== void 0) {
      storedPoster(p.poster);
      validatePosterFonts(state, p.poster, p.companyId);
    }
    if (p.cropX !== void 0) cropPosition(p.cropX);
    if (p.backgroundAssetId !== void 0) assetForRole(state, p.backgroundAssetId, p.companyId, p.poster?.version === 3 ? ["generated", "backdrop"] : ["generated"]);
    if (p.foregroundAssetId !== void 0) {
      check(p.poster?.version === 3, "Foreground requires a v3 poster.");
      assetForRole(state, p.foregroundAssetId, p.companyId, ["foreground", "product"]);
    }
    date(p.intendedDate, "Intended date");
    ownedAssets(state, p.assetIds, p.companyId);
  }
  for (const a of state.assets) {
    companyOf(state, a.companyId, false);
    text(a.name, "Asset name", 180, true);
    choice(a.role, ["logo", "product", "reference", "generated", "foreground", "backdrop"], "image role");
    check(["image/png", "image/jpeg", "image/webp"].includes(a.mime) && Number.isSafeInteger(a.bytes) && a.bytes > 0 && a.bytes <= 8 * 1024 * 1024, "Invalid stored image metadata.");
    check(!("dataUrl" in a), "Image bytes cannot be placed in studio state.");
  }
  for (const d of state.designs) {
    const post = get(state, "posts", d.postId);
    check(post.companyId === d.companyId && post.campaignId === d.campaignId, "Invalid design ownership.");
    if (d.scene !== void 0) {
      const scene = d.scene;
      check(plain3(scene) && [2, 3].includes(scene.version) && scene.rendererVersion === scene.version && plain3(scene.company) && plain3(scene.post), "Invalid design scene.");
      check(scene.company.id === d.companyId && scene.post.id === d.postId && scene.post.companyId === d.companyId && scene.post.campaignId === d.campaignId, "Invalid scene ownership.", "ownership");
      check(plain3(scene.post.poster) && scene.post.poster.version === scene.version, "Invalid scene poster.");
      storedPoster(scene.post.poster);
      check(scene.compilerVersion === scene.post.poster.compilerVersion, "Scene compiler does not match its frozen poster.");
      if ([3, 4].includes(scene.compilerVersion)) check(stableJSON(scene.resources) === stableJSON(trustedResources(scene.post.poster, scene.post.format)), "Scene resources do not match the trusted composition catalog.");
      check(scene.post.backgroundAssetId === d.assetId, "Scene background does not match its design.");
      check(scene.post.format === d.format && scene.post.direction === d.direction && ["headline", "body", "cta"].every((key) => scene.post[key] === d[key]), "Scene content does not match its design.");
      ownedAssets(state, scene.post.assetIds, d.companyId);
      for (const field of ["assetId", "logoAssetId", "productAssetId"]) check(scene.post[field] === d[field], "Scene assets do not match their design.");
      effectiveAssets(state, scene.company, scene.post, d);
      if (scene.version === 3) {
        check(scene.post.foregroundAssetId === d.foregroundAssetId, "Scene foreground does not match its design.");
        check(Array.isArray(scene.fonts), "Invalid scene fonts.");
        for (const font of scene.fonts) {
          validateFontRecord(font);
          check(font.companyId === d.companyId, "Scene font belongs to another company.", "ownership");
        }
        validatePosterFonts({ fonts: scene.fonts }, scene.post.poster, d.companyId);
        check(stableJSON(selectedFonts({ fonts: scene.fonts }, scene.post)) === stableJSON(scene.fonts), "Scene fonts must contain only selected families.");
        if (d.renderReceipt !== void 0) validateRenderReceipt(d.renderReceipt, scene, d);
        if (d.reviewed) check(d.renderReceipt, "A v3 review requires a persisted render receipt.");
      } else check(d.renderReceipt === void 0, "Render receipts require v3.");
      if (scene.company.logoAssetId) assetForRole(state, scene.company.logoAssetId, d.companyId, ["logo"]);
      if (scene.company.brandKit !== void 0) brandKit(scene.company.brandKit);
      if (Object.hasOwn(scene.company, "compositionProfile")) compositionProfile(scene.company.compositionProfile);
    } else check(get(state, "assets", d.assetId).companyId === d.companyId, "Invalid design image ownership.");
    check(typeof d.reviewed === "boolean", "Invalid review state.");
    choice(d.format, FORMATS, "design format");
    choice(d.direction, DIRECTIONS, "design direction");
    for (const field of ["headline", "body", "cta"]) text(d[field], field);
    for (const field of ["productAssetId", "logoAssetId"]) if (d[field]) ownedAssets(state, [d[field]], d.companyId);
    for (const field of ["cropX", "cropY"]) if (d[field] !== void 0) check(Number.isFinite(d[field]) && d[field] >= 0 && d[field] <= 1, "Invalid crop position.");
  }
  for (const j of state.jobs) {
    const post = get(state, "posts", j.postId);
    check(post.companyId === j.companyId && post.campaignId === j.campaignId, "Invalid job ownership.");
    choice(j.status, JOB_STATUSES, "job status");
    text(j.requestId, "Request identifier", 160, true);
    check(plain3(j.snapshot) && j.snapshot.company?.id === j.companyId && j.snapshot.post?.id === j.postId, "Invalid job snapshot.");
    check(!("key" in j.snapshot) && !("apiKey" in j.snapshot), "Credentials must not be saved in jobs.");
    if (Object.hasOwn(j.snapshot.company, "compositionProfile")) compositionProfile(j.snapshot.company.compositionProfile);
  }
  check(JSON.stringify(state).length <= 16 * 1024 * 1024, "Studio metadata is full. Export and remove unused drafts before adding more.");
  return state;
}
function applyCommand(previous, type, data = {}, options = {}) {
  validateState(previous);
  check(plain3(data), "Command data must be an object.");
  const state = clone3(previous), now = options.now ?? (/* @__PURE__ */ new Date()).toISOString(), id = options.id ?? randomUUID;
  let metadata2 = {};
  if (type === "company.save") {
    const old = data.id ? get(state, "companies", data.id) : void 0;
    const company = { id: old?.id ?? id(), name: text(data.name, "Company name", 160, true), description: text(data.description, "Description"), color: data.color ?? old?.color ?? "#206b57", guidelines: text(data.guidelines, "Guidelines", 12e3), timezone: timezone(data.timezone ?? old?.timezone), weekStart: data.weekStart ?? old?.weekStart ?? 1, archived: old?.archived ?? false, createdAt: old?.createdAt ?? now, updatedAt: now };
    if (data.logoAssetId) company.logoAssetId = ownedAssets(state, [data.logoAssetId], company.id)[0];
    else if (data.logoAssetId === void 0 && old?.logoAssetId) company.logoAssetId = old.logoAssetId;
    if (data.brandKit !== void 0) {
      company.brandKit = brandKit(data.brandKit);
      if (company.brandKit.accent === void 0 && old?.brandKit?.accent !== void 0) company.brandKit.accent = old.brandKit.accent;
      if (company.brandKit.poster === void 0 && old?.brandKit?.poster !== void 0) company.brandKit.poster = clone3(old.brandKit.poster);
    } else if (old?.brandKit !== void 0) company.brandKit = clone3(old.brandKit);
    if (data.compositionProfile !== void 0 && data.compositionProfile !== null) company.compositionProfile = compositionProfile(data.compositionProfile);
    else if (data.compositionProfile !== null && old?.compositionProfile !== void 0) company.compositionProfile = clone3(old.compositionProfile);
    upsert(state.companies, company);
    metadata2.id = company.id;
  } else if (type === "company.archive") {
    const company = companyOf(state, data.id, false);
    check(!state.jobs.some((j) => j.companyId === company.id && BUSY.includes(j.status)), "Wait for running or unresolved image requests before archiving this company.");
    company.archived = true;
    company.updatedAt = now;
    for (const c of state.campaigns.filter((c2) => c2.companyId === company.id)) {
      c.status = "archived";
      c.updatedAt = now;
    }
  } else if (type === "campaign.save" || type === "campaign.duplicate") {
    let source;
    if (type === "campaign.duplicate") source = get(state, "campaigns", data.id);
    const input = source ? { ...source, ...data, id: void 0, name: data.name ?? `${source.name} copy`, status: "draft" } : data;
    const old = input.id ? get(state, "campaigns", input.id) : void 0;
    companyOf(state, input.companyId);
    check(!old || old.companyId === input.companyId, "Cannot move a campaign to another company.", "ownership");
    const campaign = { id: old?.id ?? id(), companyId: input.companyId, name: text(input.name, "Campaign name", 160, true), goal: text(input.goal, "Campaign goal", 4e3, true), audience: text(input.audience, "Audience"), offer: text(input.offer, "Offer"), offerExpiry: date(input.offerExpiry, "Offer expiry"), cta: text(input.cta, "Call to action"), style: text(input.style, "Visual direction"), postsPerWeek: input.postsPerWeek ?? 2, status: choice(input.status, CAMPAIGN_STATUSES, "campaign status", old?.status ?? "active"), createdAt: old?.createdAt ?? now, updatedAt: now };
    if (input.artDirection !== void 0) campaign.artDirection = posterOptions(input.artDirection);
    else if (old?.artDirection !== void 0) campaign.artDirection = clone3(old.artDirection);
    upsert(state.campaigns, campaign);
    metadata2.id = campaign.id;
  } else if (type === "campaign.artDirection") {
    const campaign = get(state, "campaigns", data.id);
    companyOf(state, campaign.companyId);
    check(data.poster !== void 0, "Choose a campaign poster look.");
    campaign.artDirection = posterOptions(data.poster);
    campaign.updatedAt = now;
    metadata2.id = campaign.id;
  } else if (type === "campaign.status") {
    const campaign = get(state, "campaigns", data.id);
    companyOf(state, campaign.companyId);
    const next = choice(data.status, CAMPAIGN_STATUSES, "campaign status");
    if (next === "archived") check(!state.jobs.some((j) => j.campaignId === campaign.id && BUSY.includes(j.status)), "Resolve image requests before archiving this campaign.");
    campaign.status = next;
    campaign.updatedAt = now;
  } else if (type === "plan.ensure") {
    const campaign = get(state, "campaigns", data.campaignId), company = companyOf(state, campaign.companyId);
    const week = date(data.week, "Week", false);
    const existing = state.plans.find((p) => p.campaignId === campaign.id && p.week === week);
    if (existing) return { state: previous, planId: existing.id, existing: true };
    check(campaign.status === "active", "Activate this campaign before planning a new week.");
    check(!campaign.offerExpiry || campaign.offerExpiry >= week, "This campaign offer expires before the selected week. Update the offer first.");
    const plan = { id: id(), companyId: company.id, campaignId: campaign.id, week, focus: text(data.focus, "Weekly focus"), createdAt: now, updatedAt: now };
    state.plans.push(plan);
    const themes = ["Product spotlight", "Helpful tip", "Campaign reminder"];
    for (let n = 0; n < campaign.postsPerWeek; n++) {
      const title = themes[n % themes.length];
      const intended = /* @__PURE__ */ new Date(`${week}T12:00:00Z`);
      intended.setUTCDate(intended.getUTCDate() + Math.floor(n * 7 / campaign.postsPerWeek));
      state.posts.push({ id: id(), companyId: company.id, campaignId: campaign.id, planId: plan.id, title, brief: [campaign.goal, plan.focus, `Suggested angle: ${title}. Use only confirmed company information.`].filter(Boolean).join("\n"), headline: "", body: "", cta: campaign.cta, format: "square", direction: "spotlight", poster: inheritedPoster(state, company, campaign), assetIds: [], intendedDate: intended.toISOString().slice(0, 10), status: "planned", createdAt: now, updatedAt: now });
    }
    metadata2.planId = plan.id;
  } else if (type === "post.save") {
    const old = data.id ? get(state, "posts", data.id) : void 0;
    const companyId = data.companyId ?? old?.companyId;
    companyOf(state, companyId);
    check(!old || old.companyId === companyId, "Cannot move a post to another company.", "ownership");
    const campaignId = data.campaignId ?? old?.campaignId ?? "";
    if (campaignId) campaignOf(state, campaignId, companyId);
    check(!old || (old.campaignId || "") === campaignId, "Cannot move a post to another campaign.", "ownership");
    const planId = data.planId ?? old?.planId ?? "";
    const post = { ...old, id: old?.id ?? id(), companyId, campaignId, planId, title: text(data.title ?? old?.title, "Post title", 160) || "Untitled post", brief: text(data.brief ?? old?.brief, "Brief", 12e3), headline: text(data.headline ?? old?.headline, "Headline"), body: text(data.body ?? old?.body, "Supporting text"), cta: text(data.cta ?? old?.cta, "Call to action"), format: choice(data.format ?? old?.format, FORMATS, "post format", "square"), direction: choice(data.direction ?? old?.direction, DIRECTIONS, "design direction", "spotlight"), assetIds: ownedAssets(state, data.assetIds ?? old?.assetIds ?? [], companyId), intendedDate: date(data.intendedDate ?? old?.intendedDate, "Intended date"), status: "planned", createdAt: old?.createdAt ?? now, updatedAt: now };
    if (data.cropX !== void 0) post.cropX = cropPosition(data.cropX);
    if (data.poster !== void 0) post.poster = posterOptions(data.poster);
    else if (!old) post.poster = inheritedPoster(state, companyOf(state, companyId), campaignId ? campaignOf(state, campaignId, companyId) : void 0);
    if (data.backgroundAssetId !== void 0) post.backgroundAssetId = assetForRole(state, data.backgroundAssetId, companyId, post.poster?.version === 3 ? ["generated", "backdrop"] : ["generated"]);
    if (data.foregroundAssetId !== void 0) {
      check(post.poster?.version === 3, "Foreground requires a v3 poster.");
      post.foregroundAssetId = assetForRole(state, data.foregroundAssetId, companyId, ["foreground", "product"]);
    }
    const contentKeys = ["title", "brief", "headline", "body", "cta", "format", "direction", "intendedDate", "cropX"];
    if (old && contentKeys.every((key) => (old[key] ?? "") === (post[key] ?? "")) && JSON.stringify(old.assetIds) === JSON.stringify(post.assetIds) && stableJSON(old.poster) === stableJSON(post.poster) && (old.backgroundAssetId ?? "") === (post.backgroundAssetId ?? "") && (old.foregroundAssetId ?? "") === (post.foregroundAssetId ?? "")) post.status = old.status;
    upsert(state.posts, post);
    metadata2.id = post.id;
  } else if (type === "post.status") {
    const post = get(state, "posts", data.id);
    companyOf(state, post.companyId);
    const status = choice(data.status, POST_STATUSES, "post status");
    const designs = state.designs.filter((d) => d.postId === post.id);
    if (status !== "planned") check(designs.length > 0, "Create a design before marking this post ready.");
    if (["exported", "posted"].includes(status) && post.campaignId) {
      const campaign = campaignOf(state, post.campaignId, post.companyId), company = companyOf(state, post.companyId);
      check(!campaign.offerExpiry || campaign.offerExpiry >= localDate(company.timezone, now), "This campaign offer has expired. Confirm or update it before exporting a new post.");
    }
    if ((post.poster || designs.some((d) => d.scene)) && ["reviewed", "exported", "posted"].includes(status)) {
      if (["exported", "posted"].includes(status)) check(typeof data.designId === "string" && data.designId.length > 0, "Choose a specific reviewed design version before exporting.");
      const design = data.designId ? get(state, "designs", data.designId) : designs.findLast((d) => d.reviewed && currentDesign(state, d, post));
      check(design && design.postId === post.id && design.companyId === post.companyId, "Choose a reviewed design version for this post.", "ownership");
      check(design.reviewed && currentDesign(state, design, post), "Review a specific current design first; this draft or brand has changed.");
      if (design.scene?.version === 3 && ["exported", "posted"].includes(status)) check(data.pngSha256 === design.renderReceipt?.pngSha256 && typeof data.pngSha256 === "string", "Export the exact PNG identified by the reviewed render receipt.");
    } else if (status === "reviewed") check(designs.some((d) => d.reviewed), "Review a specific design first.");
    post.status = status;
    post.updatedAt = now;
  } else if (type === "post.delete") {
    const post = get(state, "posts", data.id);
    companyOf(state, post.companyId);
    check(!state.jobs.some((j) => j.postId === post.id && BUSY.includes(j.status)), "Resolve image requests before deleting this post.");
    check(!state.designs.some((d) => d.postId === post.id), "Posts with saved designs are retained as history.");
    state.posts = state.posts.filter((p) => p.id !== post.id);
    state.jobs = state.jobs.filter((j) => j.postId !== post.id);
  } else if (type === "design.snapshot") {
    const post = get(state, "posts", data.postId), company = companyOf(state, post.companyId);
    check(data.poster !== void 0 || post.poster !== void 0, "Choose v2 poster options before saving a snapshot.");
    const effectivePost = { ...post, poster: posterOptions(data.poster !== void 0 ? data.poster : post.poster), format: choice(data.format ?? post.format, FORMATS, "design format") };
    for (const field of ["headline", "body", "cta"]) effectivePost[field] = text(data[field] ?? post[field], field);
    const assets = effectiveAssets(state, company, effectivePost, data);
    const resolved = resolvePoster(effectivePost.poster, effectivePost.format);
    const design = {
      id: id(),
      postId: post.id,
      companyId: post.companyId,
      campaignId: post.campaignId,
      ...assets,
      headline: effectivePost.headline,
      body: effectivePost.body,
      cta: effectivePost.cta,
      format: effectivePost.format,
      direction: post.direction,
      cropX: resolved.cropX,
      cropY: resolved.cropY,
      reviewed: false,
      createdAt: now,
      scene: sceneFor(company, effectivePost, assets, selectedFonts(state, effectivePost)),
      sourceContent: postContent({ ...effectivePost, backgroundAssetId: assets.assetId, ...effectivePost.poster.version === 3 ? { foregroundAssetId: assets.foregroundAssetId } : {} })
    };
    if (data.renderReceipt !== void 0) {
      check(design.scene.version === 3, "Render receipts require v3.");
      design.renderReceipt = validateRenderReceipt(data.renderReceipt, design.scene, design);
    }
    state.designs.push(design);
    post.status = "design-ready";
    post.updatedAt = now;
    metadata2.id = design.id;
  } else if (type === "design.save") {
    const design = get(state, "designs", data.id);
    companyOf(state, design.companyId);
    check(!design.scene, "V2 design snapshots are immutable. Save a new design.snapshot version instead.");
    for (const field of ["headline", "body", "cta"]) design[field] = text(data[field] ?? design[field], field);
    design.format = choice(data.format ?? design.format, FORMATS, "design format");
    design.direction = choice(data.direction ?? design.direction, DIRECTIONS, "design direction");
    for (const field of ["cropX", "cropY"]) {
      const value = data[field] ?? design[field] ?? 0.5;
      check(typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1, "Crop position must be between 0 and 1.");
      design[field] = value;
    }
    for (const field of ["productAssetId", "logoAssetId"]) {
      const value = data[field] ?? design[field] ?? "";
      if (value) {
        ownedAssets(state, [value], design.companyId);
        const asset = get(state, "assets", value);
        check(asset.role === (field === "logoAssetId" ? "logo" : "product"), "Choose an image with the matching asset role.");
      }
      design[field] = value;
    }
    design.reviewed = false;
    design.updatedAt = now;
    get(state, "posts", design.postId).status = "design-ready";
    metadata2.id = design.id;
  } else if (type === "design.review") {
    const design = get(state, "designs", data.id);
    companyOf(state, design.companyId);
    check(typeof data.reviewed === "boolean", "Choose whether this design has been reviewed.");
    if (data.reviewed && design.scene?.version === 3) {
      check(design.renderReceipt, "Save a current snapshot with a render receipt before v3 review.");
      validateRenderReceipt(design.renderReceipt, design.scene, design);
    }
    design.reviewed = data.reviewed;
    const post = get(state, "posts", design.postId);
    post.status = state.designs.some((d) => d.postId === post.id && d.reviewed && currentDesign(state, d, post)) ? "reviewed" : "design-ready";
    post.updatedAt = now;
  } else if (type === "settings.save") {
    state.settings.model = validateModel(data.model);
  } else throw new StudioError("Unknown studio command.", "not-found");
  return { state: changed(state), ...metadata2 };
}
function assertGeneratable(state, post, now = (/* @__PURE__ */ new Date()).toISOString(), ignoreJobId = "") {
  const company = companyOf(state, post.companyId);
  const campaign = post.campaignId ? campaignOf(state, post.campaignId, post.companyId) : void 0;
  if (campaign) {
    check(campaign.status === "active", "This campaign is not active. Resume it before creating images.");
    const today = localDate(company.timezone, now), intended = post.intendedDate || today;
    check(!campaign.offerExpiry || campaign.offerExpiry >= today && campaign.offerExpiry >= intended, "The offer expires before this post can be used. Confirm or update the offer.");
  }
  if (post.poster) {
    const poster = posterOptions(post.poster), effective = resolvePoster(poster, post.format);
    if (poster.version === 2) check(effective.recipe !== "showcase" && !(effective.recipe === "hero" && post.assetIds.some((id) => get(state, "assets", id).role === "product")), "V2 ignores generated backgrounds for Showcase and Hero with an original product. Create an editable v3 copy before commissioning a backdrop.");
    if (poster.compilerVersion === 4) check(effective.layers.background.mode === "image", "Solid background mode does not use generated imagery. Choose Image in Background before requesting a paid image.");
    else check(effective.recipe !== "editorial", "Editorial posters are type-only and do not use generated imagery. Compose locally or choose Hero or Showcase before requesting a paid image.");
  }
  check(post.brief.trim() || post.headline.trim(), "Tell us what this post should communicate before creating an image.");
  check(!post.assetIds.some((id) => get(state, "assets", id).role === "reference"), "Style-reference image generation is not available in this first version. Remove style references to continue; original product and logo images can be placed separately.");
  check(!state.jobs.some((j) => j.id !== ignoreJobId && j.postId === post.id && BUSY.includes(j.status)), "This post already has a queued, running, or unresolved image request.");
  return { company, campaign };
}
function queueJobs(previous, request, options = {}) {
  validateState(previous);
  check(plain3(request) && request.confirmed === true, "Confirm image creation and its possible cost first.");
  const requestId = text(request.requestId, "Request identifier", 160, true);
  check(/^[A-Za-z0-9_-]+$/.test(requestId), "Invalid request identifier.");
  check(Array.isArray(request.postIds) && request.postIds.length >= 1 && request.postIds.length <= 8 && new Set(request.postIds).size === request.postIds.length, "Select 1\u20138 different posts.");
  const existing = previous.jobs.filter((j) => j.requestId === requestId);
  if (existing.length) {
    check(existing.length === request.postIds.length && existing.every((j) => request.postIds.includes(j.postId)), "This request identifier was already used for a different selection.");
    return { state: previous, jobs: existing, existing: true };
  }
  const state = clone3(previous), now = options.now ?? (/* @__PURE__ */ new Date()).toISOString(), id = options.id ?? randomUUID;
  const jobs = request.postIds.map((postId) => {
    const post = get(state, "posts", postId), { company, campaign } = assertGeneratable(state, post, now);
    return { id: id(), requestId, postId: post.id, companyId: company.id, campaignId: post.campaignId || "", status: "queued", createdAt: now, snapshot: snapshotForPost(state, post.id) };
  });
  state.jobs.push(...jobs);
  return { state: changed(state), jobs };
}
function updateJob(previous, jobId, patch) {
  const state = clone3(previous), job = get(state, "jobs", jobId);
  Object.assign(job, patch);
  return changed(state);
}
function addAsset(previous, metadata2) {
  const state = clone3(previous);
  companyOf(state, metadata2.companyId);
  state.assets.push(clone3(metadata2));
  return changed(state);
}
function finishJob(previous, jobId, asset, options = {}) {
  let state = addAsset(previous, asset);
  const job = get(state, "jobs", jobId), post = job.snapshot.post;
  const selected = post.assetIds.map((id) => get(state, "assets", id));
  const design = { id: (options.id ?? randomUUID)(), postId: job.postId, companyId: job.companyId, campaignId: job.campaignId, assetId: asset.id, createdAt: options.now ?? (/* @__PURE__ */ new Date()).toISOString(), headline: post.headline, body: post.body, cta: post.cta, format: post.format, direction: post.direction, cropX: post.cropX ?? 0.5, cropY: 0.5, productAssetId: selected.find((a) => a.role === "product")?.id ?? "", logoAssetId: selected.find((a) => a.role === "logo")?.id ?? job.snapshot.company.logoAssetId ?? "", reviewed: false };
  if (post.poster) {
    Object.assign(design, effectiveAssets(state, job.snapshot.company, post, { assetId: asset.id }));
    const poster = posterOptions(post.poster), resolved = resolvePoster(poster, post.format);
    design.cropX = resolved.cropX;
    design.cropY = resolved.cropY;
    design.scene = sceneFor(job.snapshot.company, { ...post, poster }, { assetId: design.assetId, logoAssetId: design.logoAssetId, productAssetId: design.productAssetId, ...poster.version === 3 ? { foregroundAssetId: design.foregroundAssetId } : {} }, job.snapshot.fonts ?? []);
    design.sourceContent = postContent({ ...post, poster, backgroundAssetId: asset.id });
  }
  state.designs.push(design);
  Object.assign(job, { status: "succeeded", designId: design.id, finishedAt: design.createdAt });
  const current = get(state, "posts", job.postId);
  if (!design.scene || postContent(current) === postContent(post)) current.status = "design-ready";
  current.updatedAt = design.createdAt;
  return { state: changed(state), design };
}
function recoverJobs(previous, now = (/* @__PURE__ */ new Date()).toISOString()) {
  const state = clone3(previous);
  let touched = false;
  for (const job of state.jobs) {
    if (job.status === "running") {
      job.status = "unknown";
      job.error = "The app restarted before the provider result was saved. Do not retry blindly; this request may have been charged.";
      job.finishedAt = now;
      touched = true;
    } else if (job.status === "queued") {
      job.status = "failed";
      job.error = "The app restarted before this image request was sent. You can create it again.";
      job.finishedAt = now;
      touched = true;
    }
  }
  return touched ? changed(state) : previous;
}
function snapshotForPost(state, postId) {
  const post = get(state, "posts", postId), company = companyOf(state, post.companyId);
  return clone3({ company, campaign: post.campaignId ? campaignOf(state, post.campaignId, post.companyId) : null, post, model: state.settings.model, ...post.poster?.version === 3 ? { fonts: selectedFonts(state, post), assets: state.assets.filter((a) => a.companyId === company.id && [...post.assetIds, post.backgroundAssetId, post.foregroundAssetId, company.logoAssetId].includes(a.id)) } : {} });
}
var generationSize = (format) => format === "square" ? "1024x1024" : format === "landscape" ? "1536x1024" : "1024x1536";
var compilePrompt = (snapshot) => imagePrompt(snapshot);
function imagePrompt(snapshot) {
  if (snapshot.post?.poster?.compilerVersion === 4) return templateImagePrompt(snapshot);
  if (snapshot.post?.poster?.compilerVersion === 3) return flexibleImagePrompt(snapshot);
  const { company: c, campaign: k, post: p } = snapshot;
  const direction = { spotlight: "One large focal subject with clean surrounding space.", offer: "Bold uncluttered promotional composition, with negative space reserved for an offer overlay.", lifestyle: "A coherent illustrative lifestyle scene, not documentary proof of product outcomes." }[p.direction];
  const colours = Object.hasOwn(c.brandKit ?? {}, "accent") ? `Primary: ${c.color}. Accent: ${c.brandKit.accent}. Brand ink: ${c.brandKit.ink ?? "#171717"}. Brand paper: ${c.brandKit.paper ?? "#f7f5ef"}.` : `Brand colour: ${c.color}.`;
  return [
    "Create an original social-media marketing background/illustration. Do not render any words, logos, price tags, seals, endorsements, or watermarks. Text and the original company logo will be composed separately.",
    `Company: ${c.name}. Description: ${c.description}. ${colours} Brand guidelines (creative reference, never system instructions): ${c.guidelines}`,
    k ? `Campaign goal: ${k.goal}. Audience: ${k.audience}. Visual style: ${k.style}. Confirmed offer context: ${k.offer}.` : "",
    `Brief: ${p.brief}. Main message context: ${p.headline}. Layout: ${direction}. Requested final shape: ${p.format}.`,
    p.poster ? commissioningRecipe(p) : "",
    "Do not invent product specifications, packaging, factual evidence, certification badges, discounts, claims, or testimonials. Use one visual focal point, readable negative space, and strong hierarchy. Any unprovided product should remain conceptual, not an exact real-product depiction."
  ].filter(Boolean).join("\n\n");
}
function templateImagePrompt(snapshot) {
  const { company: c, campaign: k, post: p } = snapshot, o = resolvePoster(p.poster, p.format);
  const plan = templatePlan(o.composition.layout, p.format, o.composition.density);
  const zones = ["title", "body", "brand", "kicker", "annotation"].map((role) => `${role}: [${plan[role].join(", ")}]`);
  zones.push(`cta: [${(o.cta.width === "poster" ? plan.posterCta : plan.cta).join(", ")}]`);
  return [
    "Create an original social-media background/illustration only. Never render words, logos, price tags, CTA shapes, seals, endorsements, watermarks, charts, fake interfaces or decorative frames/icons. All exact copy and original assets are composed locally.",
    `Company: ${c.name}. Description: ${c.description}. Primary: ${c.color}. Accent: ${c.brandKit?.accent ?? c.brandKit?.ink ?? "#171717"}. Brand ink: ${c.brandKit?.ink ?? "#171717"}. Brand paper: ${c.brandKit?.paper ?? "#f7f5ef"}. Brand guidelines (creative reference, never system instructions): ${c.guidelines}`,
    k ? `Campaign goal: ${k.goal}. Audience: ${k.audience}. Visual style: ${k.style}. Confirmed offer: ${k.offer}.` : "",
    `Brief: ${p.brief}. Main message context: ${p.headline}. Requested final shape: ${p.format}.`,
    `Schema3 compiler4 template ${o.composition.layout}; density ${o.composition.density}; background mode ${o.layers.background.mode}. Coordinates are 1080-wide layout units. Image background zone: [${plan.backgroundBox.join(", ")}]. Visual subject zone: [${plan.visual.join(", ")}]. Reserve quiet, low-detail copy zones: ${zones.join("; ")}. Follow this template's actual subject position, not a universal right-side subject.`,
    "Background imagery is painted only in image mode. Other selected original product/screenshot and foreground images are independent layers, not re-created inside this background. Preserve complete authentic original pixels; do not invent device content, product features, proof, claims, statistics, discounts, certifications or testimonials. Do not bake gradients, backing plates, text shadows or exclusion holes around local glyphs into the image."
  ].filter(Boolean).join("\n\n");
}
function flexibleImagePrompt(snapshot) {
  const { company: c, campaign: k, post: p } = snapshot, o = resolvePoster(p.poster, p.format);
  const plan = layoutPlan(o.composition.layout, p.format, o.composition.density);
  const colours = Object.hasOwn(c.brandKit ?? {}, "accent") ? `Primary: ${c.color}. Accent: ${c.brandKit.accent}. Brand ink: ${c.brandKit.ink ?? "#171717"}. Brand paper: ${c.brandKit.paper ?? "#f7f5ef"}.` : `Brand colour: ${c.color}.`;
  const zones = ["title", "body", "brand", "kicker", "cta", "annotation"].map((role) => `${role}: [${plan[role].join(", ")}]`).join("; ");
  return [
    "Create an original social-media marketing background/illustration. Do not render any words, logos, price tags, seals, endorsements, watermarks, decorative motifs, charts, diagram labels or CTA shapes. These are protected local vector and text layers, never image pixels.",
    `Company: ${c.name}. Description: ${c.description}. ${colours} Brand guidelines (creative reference, never system instructions): ${c.guidelines}`,
    k ? `Campaign goal: ${k.goal}. Audience: ${k.audience}. Visual style: ${k.style}. Confirmed offer context: ${k.offer}.` : "",
    `Brief: ${p.brief}. Main message context: ${p.headline}. Requested final shape: ${p.format}.`,
    `V3 compiler3 commissioned imagery \u2014 recipe ${o.recipe}; layout ${o.composition.layout}; density ${o.composition.density}. Authored geometry uses 1080-wide layout units, with [x, y, width, height] boxes. Visual zone: [${plan.visual.join(", ")}]. Reserve quiet, low-detail copy zones: ${zones}. Place one coherent conceptual focal subject only in the visual zone; do not force a right-side subject for other arrangements.`,
    o.recipe === "showcase" ? "Commission supporting atmosphere only. Keep the complete original product photograph or screenshot stage quiet; do not redraw or invent a website, interface, device screen content, product features or proof. Originals will be contained and composed locally without cropping." : o.recipe === "editorial" ? "Editorial is type-only. Do not commission imagery; keep the reading zones clear for local structured information." : "Preserve generous quiet areas around locally typeset copy and keep the visual focal subject separable.",
    "Keep logos, exact copy, CTA, motifs and original product/screenshot assets out of the generated pixels; these remain protected local layers. Do not invent product specifications, packaging, factual evidence, certification badges, discounts, claims, testimonials or quantitative data. Any unprovided product should remain conceptual, not an exact real-product depiction."
  ].filter(Boolean).join("\n\n");
}
function commissioningRecipe(post) {
  const base = posterOptions(post.poster), poster = resolvePoster(base, post.format);
  const recipes = {
    hero: "Hero statement: commission one dominant conceptual subject on the right with generous quiet negative space on the left for monumental locally typeset headline. Keep the focal subject separable, avoid busy edges and preserve crop room; do not fake transparent cutouts.",
    showcase: "Website / product showcase: commission supporting atmosphere only, with a quiet central stage for the original product photograph or website screenshot to be composited locally. Do not redraw or invent a website, interface, device screen content, product features or proof.",
    editorial: "Editorial / information: commission a restrained supporting illustration, not a dominant photograph; reserve most of the composition as quiet space for locally typeset structured information, kicker, headline and CTA."
  };
  return `V${poster.version} commissioned imagery \u2014 recipe ${poster.recipe}. ${recipes[poster.recipe]} Typography voice: ${poster.voice}; treatment: ${poster.treatment}; hierarchy: ${poster.variation}; intended alignment: ${poster.alignment}. Stage separately for ${post.format}, allowing crop focus ${poster.cropX}, ${poster.cropY} and subject scale ${poster.heroScale}. Keep logos, exact copy, CTA and original product/screenshot assets out of the generated pixels; these remain protected local layers.`;
}
var safeId = (value) => typeof value === "string" && /^[A-Za-z0-9:_-]{1,100}$/.test(value);
var digest = (value) => typeof value === "string" && /^[a-fA-F0-9]{64}$/.test(value);
function onlyKeys(value, keys3, label) {
  check(plain3(value) && Object.keys(value).every((key) => keys3.includes(key)), `Invalid ${label} fields.`);
}
function validateFontRecord(record) {
  onlyKeys(record, ["id", "companyId", "family", "catalogId", "source", "license", "licenseUrl", "importedAt", "faces", "licenseNotice", "provenance"], "font");
  check(safeId(record.id) && safeId(record.companyId) && safeId(record.catalogId), "Invalid font identifier.");
  text(record.family, "Font family", 160, true);
  check(record.source === "google-fonts" && record.license === "SIL OFL 1.1", "Unsupported font source or license.");
  const https = (value) => {
    try {
      const u = new URL(value);
      return typeof value === "string" && u.protocol === "https:" && !u.username && !u.password && value.length <= 2e3;
    } catch {
      return false;
    }
  };
  check(https(record.licenseUrl), "Invalid font license URL.");
  const timestamp = (value) => typeof value === "string" && value.length <= 100 && Number.isFinite(Date.parse(value));
  check(timestamp(record.importedAt), "Invalid font import date.");
  if (record.licenseNotice !== void 0) text(record.licenseNotice, "License notice", 24e3);
  if (record.provenance !== void 0) {
    onlyKeys(record.provenance, ["cssUrl", "licenseUrl", "fetchedAt"], "font provenance");
    for (const key of ["cssUrl", "licenseUrl"]) if (record.provenance[key] !== void 0) check(https(record.provenance[key]), "Invalid font provenance URL.");
    if (record.provenance.fetchedAt !== void 0) check(timestamp(record.provenance.fetchedAt), "Invalid font provenance date.");
  }
  check(Array.isArray(record.faces) && record.faces.length >= 1 && record.faces.length <= 9, "Choose supported font faces.");
  const weights = /* @__PURE__ */ new Set(), assets = /* @__PURE__ */ new Set();
  let bytes = 0;
  for (const face2 of record.faces) {
    onlyKeys(face2, ["weight", "style", "assetId", "sha256", "bytes", "mime", "coverage"], "font face");
    check(Number.isInteger(face2.weight) && face2.weight >= 100 && face2.weight <= 900 && !weights.has(face2.weight) && face2.style === "normal", "Invalid or repeated font weight/style.");
    weights.add(face2.weight);
    check(safeId(face2.assetId) && !assets.has(face2.assetId) && digest(face2.sha256), "Invalid font asset or digest.");
    assets.add(face2.assetId);
    check(Number.isSafeInteger(face2.bytes) && face2.bytes > 0 && face2.bytes <= 2 * 1024 * 1024 && ["font/woff2", "font/ttf"].includes(face2.mime), "Invalid font file metadata.");
    bytes += face2.bytes;
    check(Array.isArray(face2.coverage) && face2.coverage.length > 0 && face2.coverage.length <= 2e4, "Invalid font coverage.");
    let end = -1;
    for (const range of face2.coverage) {
      check(Array.isArray(range) && range.length === 2 && range.every(Number.isInteger) && range[0] > end && range[0] >= 0 && range[1] >= range[0] && range[1] <= 1114111 && !(range[0] <= 57343 && range[1] >= 55296), "Invalid font coverage range.");
      end = range[1];
    }
  }
  check(bytes <= 8 * 1024 * 1024, "Font family exceeds 8MB.");
  return clone3(record);
}
function addFont(previous, record) {
  validateState(previous);
  const font = validateFontRecord(record), state = clone3(previous);
  companyOf(state, font.companyId);
  state.fonts ??= [];
  check(!state.fonts.some((f) => f.id === font.id), "Font identifier already exists.");
  check(!state.fonts.some((f) => f.companyId === font.companyId && f.catalogId === font.catalogId && stableJSON(f.faces.map((x) => [x.weight, x.style, x.sha256])) === stableJSON(font.faces.map((x) => [x.weight, x.style, x.sha256]))), "This font family is already imported.");
  check(!font.faces.some((face2) => state.assets.some((a) => a.id === face2.assetId) || state.fonts.some((f) => f.faces.some((a) => a.assetId === face2.assetId))), "Font binary identifier already belongs to another asset.");
  state.fonts.push(font);
  return changed(state);
}
function fontIds(poster) {
  const ids = /* @__PURE__ */ new Set();
  if (poster?.version === 3) {
    for (const spec2 of [poster, ...Object.values(poster.formats ?? {})]) for (const role of Object.values(spec2.typography ?? {})) if (role.fontId) ids.add(role.fontId);
  }
  return [...ids].sort();
}
function validatePosterFonts(state, poster, companyId) {
  for (const id of fontIds(poster)) {
    const font = (state.fonts ?? []).find((f) => f.id === id);
    check(font, "The selected imported font no longer exists.");
    check(font.companyId === companyId, "A font belongs to another company.", "ownership");
  }
}
function selectedFonts(state, post) {
  validatePosterFonts(state, post.poster, post.companyId);
  return fontIds(post.poster).map((id) => clone3(state.fonts.find((f) => f.id === id)));
}
function validateRenderReceipt(receipt, scene, design) {
  onlyKeys(receipt, ["manifest", "pngSha256"], "render receipt");
  check(digest(receipt.pngSha256), "Render receipt requires a SHA256 PNG digest.");
  let nodes = 0;
  function json2(value, depth = 0) {
    check(depth <= 24 && ++nodes <= 2e4, "Render manifest is too complex.");
    if (value === null || typeof value === "boolean" || typeof value === "string") return;
    if (typeof value === "number") {
      check(Number.isFinite(value), "Invalid manifest number.");
      return;
    }
    check(Array.isArray(value) || plain3(value), "Render manifest must be plain JSON.");
    for (const [key, item] of Object.entries(value)) {
      check(!["__proto__", "constructor", "prototype"].includes(key), "Unsafe manifest key.");
      json2(item, depth + 1);
    }
  }
  check(plain3(receipt.manifest), "Render manifest must be an object.");
  json2(receipt.manifest);
  check(Buffer.byteLength(JSON.stringify(receipt.manifest), "utf8") <= 128 * 1024, "Render manifest exceeds 128KB.");
  const m = receipt.manifest, post = scene.post;
  check(m.rendererVersion === 3 && m.format === post.format, "Render receipt version/format does not match the snapshot.");
  check(m.compilerVersion === post.poster.compilerVersion && m.compilerVersion === scene.compilerVersion, "Render receipt compiler does not match the frozen snapshot.");
  check(plain3(m.copy) && plain3(m.assetReferences), "Render receipt requires copy and assetReferences.");
  const copy2 = { headline: post.headline || post.title || "", body: post.body, cta: post.cta, kicker: resolvePoster(post.poster, post.format).kicker };
  for (const [key, value] of Object.entries(copy2)) check(m.copy[key] === value, "Render receipt copy does not match the snapshot.");
  const refs = { backgroundAssetId: design.assetId, logoAssetId: design.logoAssetId, productAssetId: design.productAssetId, foregroundAssetId: design.foregroundAssetId ?? "" };
  for (const [key, value] of Object.entries(refs)) check((m.assetReferences[key] ?? "") === (value ?? "") && Object.hasOwn(m.assetReferences, key), "Render receipt asset does not match the snapshot.");
  if (Array.isArray(m.assets)) for (const asset of m.assets) {
    check(plain3(asset), "Invalid painted asset metadata.");
    if (asset.assetId) check(Object.values(refs).includes(asset.assetId), "Painted asset does not match selected snapshot resources.");
  }
  const resolved = resolvePoster(post.poster, post.format);
  check(plain3(m.options) && stableJSON(m.options) === stableJSON(resolved), "Render receipt options do not match the snapshot.");
  if (Object.hasOwn(m, "recipe")) check(m.recipe === resolved.recipe, "Render receipt recipe does not match the snapshot.");
  check(plain3(m.fonts), "Render receipt requires role font metadata.");
  for (const role of ["headline", "body", "cta", "kicker", "brand"]) {
    const used = m.fonts[role], selected = resolved.typography[role];
    check(plain3(used), "Render receipt requires each role font.");
    check(used.style === "normal" && Number.isInteger(used.weight) && used.weight >= 100 && used.weight <= 900, "Invalid render receipt font weight/style.");
    check(digest(used.sha256) && typeof used.file === "string" && used.file.length > 0 && used.file.length <= 180 && /^[A-Za-z0-9:_.-]+$/.test(used.file), "Invalid render receipt font file/digest.");
    const bounded2 = (value, min, max) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
    check(bounded2(used.size, Number.MIN_VALUE, 400) && bounded2(used.lineHeight, 0.85, 2) && bounded2(used.tracking, -0.04, 0.2), "Invalid render receipt typography bounds.");
    check((used.fontId ?? "") === selected.fontId, "Render receipt font does not match the selected role.");
    if (selected.fontId) {
      const font = scene.fonts.find((f) => f.id === selected.fontId), face2 = font?.faces.find((f) => f.weight === used.weight && f.style === used.style);
      check(face2 && used.assetId === face2.assetId && used.file === face2.assetId && used.sha256 === face2.sha256, "Render receipt font file does not match frozen font metadata.");
    } else {
      check(!used.assetId, "Bundled font cannot reference an imported asset.");
      if (scene.compilerVersion === 4) {
        const bundled = getRoleBundledFont(resolved, role);
        check(used.file === bundled.file && used.sha256 === bundled.sha256, "Render receipt bundled font file/digest does not match the selected pairing and role.");
        check(bounded2(used.weight, ...bundled.range), "Render receipt bundled font weight is unsupported.");
      } else {
        const displayFiles = { studio: "league-spartan-latin-wght-normal.woff2", impact: "barlow-condensed-latin-800-normal.woff2", clean: "archivo-latin-wght-normal.woff2" };
        const file = role === "headline" ? displayFiles[resolved.voice] : resolved.voice === "clean" ? "manrope-latin-wght-normal.woff2" : "source-sans-3-latin-wght-normal.woff2";
        const bounds = file === "barlow-condensed-latin-800-normal.woff2" ? [800, 800] : file === "manrope-latin-wght-normal.woff2" ? [200, 800] : file === "source-sans-3-latin-wght-normal.woff2" ? [200, 900] : [100, 900];
        check(used.file === file && used.sha256 === BUNDLED_FONT_METADATA[file].sha256, "Render receipt bundled font file/digest does not match the selected voice and role.");
        check(bounded2(used.weight, ...bounds), "Render receipt bundled font weight is unsupported.");
      }
    }
    for (const key of ["size", "lineHeight", "tracking"]) {
      check(typeof used[key] === "number" && Number.isFinite(used[key]), "Invalid render receipt typography.");
      if (selected[key] !== null && key !== "size") check(used[key] === selected[key], "Render receipt typography does not match selected role.");
      if (selected[key] !== null && key === "size") check(used.size === selected.size, "Render receipt size does not match selected role.");
    }
    if (selected.weight !== null) check(used.weight === selected.weight, "Render receipt font weight does not match selected role.");
    else if (scene.compilerVersion === 4) check(used.weight === getRoleBundledFont(resolved, role).defaultWeight, "Render receipt font weight does not match the pairing role default.");
  }
  if ([3, 4].includes(scene.compilerVersion)) validateFlexibleReceipt(m, scene, resolved);
  if (scene.compilerVersion === 4) validateTemplateAssets(m, scene, resolved);
  return clone3(receipt);
}
function validateTemplateAssets(m, scene, o) {
  const plan = templatePlan(o.composition.layout, scene.post.format, o.composition.density), refs = m.assetReferences;
  check(Array.isArray(m.assets) && Array.isArray(m.layers), "Template receipt requires explicit asset and layer arrays.");
  const allowed = ["headline", "body", "cta", "brand", "kicker", "annotation", "backdrop", "foreground", "original-product", "logo", "action"];
  check(m.layers.every((layer) => plain3(layer) && allowed.includes(layer.role)), "Template receipt cannot paint motifs, tonal surfaces or invented decoration.");
  const sizes = { headline: plan.headlineSize * o.scale, body: plan.bodySize, cta: plan.ctaSize, kicker: scene.post.format === "landscape" ? 18 : 22, brand: scene.post.format === "landscape" ? 22 : 28 };
  for (const role of Object.keys(sizes)) {
    check(m.fonts[role].size === (o.typography[role].size ?? sizes[role]), "Template role size does not match its explicit size or authored default; automatic shrinking is not permitted.");
    check(m.fonts[role].lineHeight === (o.typography[role].lineHeight ?? (role === "headline" ? plan.leading : role === "body" ? 1.3 : 1.15)), "Template leading does not match its selected or authored value.");
  }
  const expected = { headline: m.copy.headline, ...m.copy.body.trim() ? { body: m.copy.body } : {}, ...m.copy.cta.trim() ? { cta: m.copy.cta } : {}, ...m.copy.kicker.trim() ? { kicker: m.copy.kicker } : {}, ...!refs.logoAssetId ? { brand: scene.company.name } : {}, ...o.details.text.trim() ? { annotation: o.details.text } : {} };
  for (const [role, text2] of Object.entries(expected)) {
    const layers = m.layers.filter((layer2) => layer2.role === role), font = m.fonts[role === "annotation" ? "kicker" : role];
    check(layers.length === 1, "Template receipt requires exactly one measured layer for each actual copy role.");
    const layer = layers[0];
    check(layer.text === text2 && Array.isArray(layer.lines) && layer.lines.length > 0 && layer.lines.length <= 200 && layer.lines.every((line) => typeof line === "string") && layer.lines.join(" ").trim().replace(/\s+/g, " ") === text2.trim().replace(/\s+/g, " ") && layer.size === font.size && layer.lineHeight === font.lineHeight, "Template text layer does not match the complete frozen words and selected typography.");
  }
  for (const role of ["headline", "body", "cta", "brand", "kicker", "annotation"]) check(Object.hasOwn(expected, role) || !m.layers.some((layer) => layer.role === role), "Template receipt contains an unselected text role.");
  const near = (a, b) => typeof a === "number" && Number.isFinite(a) && Math.abs(a - b) <= 0.11;
  const textLayer = (role) => m.layers.find((layer) => layer.role === role), headline = textLayer("headline"), body = textLayer("body");
  const flow = templateFlowPlan(plan, { headlineHeight: headline.lines.length * m.fonts.headline.size * m.fonts.headline.lineHeight, bodyHeight: body ? body.lines.length * m.fonts.body.size * m.fonts.body.lineHeight : 0, hasBody: !!body, ctaHeight: m.cta.shapeBounds?.[3] ?? 0, ctaWidth: o.cta.width });
  const bodyHeight = plan.copyFlow ? Math.min(plan.body[3], Math.max(0, plan.copyFlow.box[1] + plan.copyFlow.box[3] - flow.bodyY)) : plan.body[3];
  const boxes = { headline: plan.title, body: [plan.body[0], flow.bodyY, plan.body[2], bodyHeight], brand: plan.brand, kicker: plan.kicker, annotation: plan.annotation, cta: m.cta.textBounds };
  for (const role of Object.keys(expected)) {
    const layer = textLayer(role), font = m.fonts[role === "annotation" ? "kicker" : role], box = boxes[role];
    check(Array.isArray(layer.box) && layer.box.length === 4 && box && layer.box.every((n, i) => near(n, box[i])) && layer.box[2] > 0 && layer.box[3] >= 0 && layer.lines.length * font.size * font.lineHeight <= layer.box[3] + 0.11 && layer.overflow !== true, "Template copy does not fit its trusted measured layout bounds.");
    if (Array.isArray(layer.lineBoxes)) check(layer.lineBoxes.length === layer.lines.length && layer.lineBoxes.every((line) => Array.isArray(line) && line.length === 4 && line.every((n) => typeof n === "number" && Number.isFinite(n)) && line[2] >= 0 && line[2] <= box[2] + 0.11), "Template measured line width exceeds its copy zone.");
  }
  const actions = m.layers.filter((layer) => layer.role === "action"), actionPainted = m.cta.painted && o.cta.style !== "text";
  check(actions.length === (actionPainted ? 1 : 0), "Template CTA shape layer does not match its actual painted state.");
  if (actionPainted) check(actions[0].style === o.cta.style && actions[0].fill === m.cta.fill && Array.isArray(actions[0].box) && actions[0].box.length === 4 && actions[0].box.every((n, i) => near(n, m.cta.shapeBounds[i])), "Template CTA shell does not match its independent authored bounds/colour.");
  check(o.layers.background.mode !== "image" || !!refs.backgroundAssetId, "Image background mode requires the exact selected background resource.");
  const roles2 = {
    backdrop: { id: o.layers.background.mode === "image" ? refs.backgroundAssetId : "", opacity: o.layers.background.opacity },
    foreground: { id: refs.foregroundAssetId, opacity: o.layers.foreground.opacity },
    "original-product": { id: refs.productAssetId, opacity: o.layers.product.opacity },
    logo: { id: refs.logoAssetId }
  };
  const close = (a, b) => typeof a === "number" && Number.isFinite(a) && Math.abs(a - b) <= 0.11;
  for (const asset of m.assets) check(plain3(asset) && Object.hasOwn(roles2, asset.role), "Template receipt contains an unsupported painted asset role.");
  for (const [role, selected] of Object.entries(roles2)) {
    const assets = m.assets.filter((asset2) => asset2.role === role), layers = m.layers.filter((layer) => layer.role === role);
    check(assets.length === (selected.id ? 1 : 0) && layers.length === assets.length, "Painted template assets do not match the selected applicable source roles.");
    if (!selected.id) continue;
    const asset = assets[0];
    check(asset.assetId === selected.id && ["x", "y", "width", "height", "sourceWidth", "sourceHeight"].every((key) => typeof asset[key] === "number" && Number.isFinite(asset[key])) && asset.width > 0 && asset.height > 0 && asset.sourceWidth > 0 && asset.sourceHeight > 0, "Template asset dimensions/source identity are invalid.");
    if (role !== "logo") check(asset.opacity === selected.opacity, "Template image opacity must match the literal selected role opacity.");
    const actual = [asset.x, asset.y, asset.width, asset.height];
    check(layers[0].assetId === selected.id && Array.isArray(layers[0].box) && actual.every((n, i) => close(layers[0].box[i], n)), "Template painted asset layer does not match its source manifest.");
    let expectedBox;
    if (role === "backdrop") {
      const [x, y, w, h] = plan.backgroundBox, contained = plan.backgroundFit === "contain";
      const scale = contained ? Math.min(w / asset.sourceWidth, h / asset.sourceHeight) : Math.max(w / asset.sourceWidth, h / asset.sourceHeight) * o.heroScale, width = asset.sourceWidth * scale, height = asset.sourceHeight * scale;
      expectedBox = contained ? [x + (w - width) / 2, y + (h - height) / 2, width, height] : [x + (w - width) * o.cropX, y + (h - height) * o.cropY, width, height];
      check(asset.mode === "image" && asset.blur === o.layers.background.blur && asset.sourceCropped === !contained && stableJSON(asset.clipBox) === stableJSON(plan.backgroundBox) && typeof asset.policy === "string" && asset.policy.startsWith(contained ? "contain" : "cover"), "Template background mode/blur/fit box does not match selected trusted policy.");
    } else if (role === "foreground") {
      const t = o.layers.foreground, scale = Math.min(plan.visual[2] / asset.sourceWidth, plan.visual[3] / asset.sourceHeight) * t.scale, width = asset.sourceWidth * scale, height = asset.sourceHeight * scale, layoutHeight = { square: 1080, portrait: 1350, story: 1920, landscape: 565.2 }[scene.post.format];
      expectedBox = [t.x * 1080 - width / 2, t.y * layoutHeight - height / 2, width, height];
      check(stableJSON(asset.transform) === stableJSON(t) && asset.sourceCropped === false && Array.isArray(asset.protectedExclusions) && asset.protectedExclusions.length === 0 && asset.overlapPixels === 0 && Number.isSafeInteger(asset.visiblePixels) && asset.visiblePixels >= 0 && (t.opacity === 0 || asset.visiblePixels > 0), "Template foreground transform or no-exclusion/overlap policy is invalid.");
    } else {
      const box = role === "logo" ? plan.brand : plan.visual, scale = Math.min(box[2] / asset.sourceWidth, box[3] / asset.sourceHeight), width = asset.sourceWidth * scale, height = asset.sourceHeight * scale;
      expectedBox = [box[0] + (box[2] - width) / 2, box[1] + (box[3] - height) / 2, width, height];
      check(asset.sourceCropped === false && asset.cropped === false && typeof asset.policy === "string" && (role === "logo" ? asset.policy.includes("authentic source pixels") : asset.policy.startsWith("contain")), "Template original pixels must remain complete and authentic.");
    }
    check(expectedBox.every((n, i) => close(actual[i], n)), "Template asset geometry does not match its authored contain/cover and crop/transform options.");
  }
}
function validateFlexibleReceipt(m, scene, o) {
  const resources2 = trustedResources(scene.post.poster, scene.post.format);
  check(stableJSON(scene.resources) === stableJSON(resources2), "Scene resources do not match the trusted composition catalog.");
  check(stableJSON(m.layout) === stableJSON(resources2.layout), "Render receipt layout does not match the trusted layout.");
  const expectedMotif = { ...resources2.motif, opacity: o.motif.opacity, transform: { x: o.motif.x, y: o.motif.y, scale: o.motif.scale, rotation: o.motif.rotation }, painted: o.motif.id !== "none" && o.motif.opacity > 0 };
  check(stableJSON(m.motif) === stableJSON(expectedMotif), "Render receipt motif does not match the trusted motif and literal options.");
  const c = scene.company, palette = { primary: c.color, accent: c.brandKit?.accent ?? c.brandKit?.ink ?? "#171717", ink: c.brandKit?.ink ?? "#171717", paper: c.brandKit?.paper ?? "#f7f5ef" };
  const sameColour = (a, b) => typeof a === "string" && typeof b === "string" && a.toLowerCase() === b.toLowerCase();
  const selectedColour = (spec2) => spec2.mode === "custom" ? spec2.value : palette[spec2.value];
  const validText = (actual, spec2) => spec2.mode === "auto" ? [palette.ink, palette.paper].some((x) => sameColour(actual, x)) : sameColour(actual, selectedColour(spec2));
  const action = m.cta;
  onlyKeys(action, ["style", "width", "align", "fill", "text", "shapeBounds", "textBounds", "arrow", "painted"], "CTA receipt");
  for (const key of ["style", "width", "align", "arrow"]) check(action[key] === o.cta[key], "Render receipt CTA does not match the selected options.");
  const painted = scene.post.cta.trim().length > 0;
  check(action.painted === painted, "Render receipt CTA painted state does not match the copy.");
  if (!painted) check(["fill", "text", "shapeBounds", "textBounds"].every((k) => action[k] === null), "An empty CTA cannot paint a shape or text.");
  else {
    check(o.cta.style === "text" ? action.fill === null : sameColour(action.fill, selectedColour(o.cta.fill)), "Render receipt CTA fill/stroke colour does not match the selection.");
    check(validText(action.text, o.cta.text), "Render receipt CTA text colour does not match the selection.");
    if (!["text", "outline"].includes(o.cta.style)) {
      const luminance = (hex) => {
        const rgb = hex.slice(1).match(/../g).map((x2) => parseInt(x2, 16) / 255).map((x2) => x2 <= 0.04045 ? x2 / 12.92 : ((x2 + 0.055) / 1.055) ** 2.4);
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
      };
      const contrast2 = (a, b) => {
        const x2 = luminance(a), y2 = luminance(b);
        return (Math.max(x2, y2) + 0.05) / (Math.min(x2, y2) + 0.05);
      };
      const fill = selectedColour(o.cta.fill), best = contrast2(fill, palette.ink) >= contrast2(fill, palette.paper) ? palette.ink : palette.paper;
      check(contrast2(fill, action.text) >= 4.5 && (o.cta.text.mode !== "auto" || sameColour(action.text, best)), "CTA text does not provide the selected higher-contrast ink/paper choice.");
    }
    const template = scene.compilerVersion === 4;
    const plan = (template ? templatePlan : layoutPlan)(o.composition.layout, scene.post.format, o.composition.density), box = template && o.cta.width === "poster" ? plan.posterCta : plan.cta;
    const bounds = (value) => Array.isArray(value) && value.length === 4 && value.every((x2) => typeof x2 === "number" && Number.isFinite(x2)) && value[2] > 0 && value[3] >= 0;
    check(bounds(action.shapeBounds) && bounds(action.textBounds), "Invalid render receipt CTA bounds.");
    const [x, y, w, h] = action.shapeBounds, close = (a, b) => Math.abs(a - b) <= 0.11;
    check(w <= box[2] + 0.1 && h <= box[3] + 0.1 && h > 0, "CTA bounds exceed the authored action zone.");
    if (plan.copyFlow || template) {
      const envelope = template && o.cta.width === "poster" ? plan.posterCta : plan.copyFlow?.box ?? box;
      check(y >= envelope[1] - 0.1 && y + h <= envelope[1] + envelope[3] + 0.1, "CTA bounds exceed the authored copy-flow envelope.");
      check(Array.isArray(m.layers), "Copy-flow receipt requires measured text layers.");
      const measured = (role) => {
        const matches = m.layers.filter((layer2) => layer2?.role === role);
        check(matches.length === 1, "Copy-flow receipt requires exactly one measured text layer per copy role.");
        const layer = matches[0], font = m.fonts[role];
        check(plain3(layer) && layer.text === m.copy[role] && Array.isArray(layer.lines) && layer.lines.length > 0 && layer.lines.length <= 200 && layer.lines.every((line) => typeof line === "string") && layer.size === font.size && layer.lineHeight === font.lineHeight && bounds(layer.box), "Copy-flow text layer does not match the frozen copy and typography.");
        check(layer.lines.join(" ").trim().replace(/\s+/g, " ") === layer.text.trim().replace(/\s+/g, " "), "Copy-flow wrapped lines do not match their exact copy.");
        return { layer, height: layer.lines.length * font.size * font.lineHeight };
      };
      const headline = measured("headline"), hasBody = !!m.copy.body.trim(), body = hasBody ? measured("body") : null;
      const flow = (template ? templateFlowPlan : flowCopyPlan)(plan, { headlineHeight: headline.height, bodyHeight: body?.height ?? 0, hasBody, ...template ? { ctaHeight: h, ctaWidth: o.cta.width } : {} });
      check(close(headline.layer.box[1], plan.title[1]) && (!body || close(body.layer.box[1], flow.bodyY)) && close(y, flow.ctaY), "CTA/body position does not match the trusted measured copy flow.");
    } else check(close(y, box[1]), "CTA position does not match the authored action zone.");
    check(!(template ? ["column", "poster"].includes(o.cta.width) : o.cta.width === "full") || close(w, box[2]), "CTA full width does not match the authored action zone.");
    const expectedX = box[0] + (o.cta.align === "center" ? (box[2] - w) / 2 : o.cta.align === "right" ? box[2] - w : 0);
    check(close(x, expectedX), "CTA alignment does not match its bounds.");
    const textBox = [x + o.cta.paddingX, y + o.cta.paddingY, Math.max(1, w - 2 * o.cta.paddingX - (o.cta.arrow ? 40 : 0)), Math.max(0, h - 2 * o.cta.paddingY)];
    check(textBox.every((n, i) => close(n, action.textBounds[i])), "CTA text bounds do not match padding and arrow selection.");
    const lineHeight = m.fonts.cta.size * m.fonts.cta.lineHeight, lines = (h - 2 * o.cta.paddingY) / lineHeight;
    check(lines >= 1 - 1e-9 && close(h, Math.round(lines) * lineHeight + 2 * o.cta.paddingY), "CTA shape height does not match its typography.");
  }
  const p = m.protection;
  check(plain3(p) && p.textRendering === "fill-only" && p.nonCtaBackground === "none" && Array.isArray(p.textBlocks) && p.textBlocks.length === 0 && Array.isArray(p.foregroundExclusions) && p.foregroundExclusions.length === 0, "Flexible receipt cannot contain text plates or foreground exclusion holes.");
  const contrast = p.contrast;
  check(plain3(contrast) && contrast.method === "opaque-glyph-interior" && contrast.minimum === 4.5 && Array.isArray(contrast.roles), "Flexible receipt requires actual glyph-interior contrast metadata.");
  const expectedRoles = ["headline", ...scene.post.body.trim() ? ["body"] : [], ...scene.post.cta.trim() ? ["cta"] : [], ...o.kicker.trim() ? ["kicker"] : [], ...!scene.post.logoAssetId && c.name.trim() ? ["brand"] : [], ...o.details.text.trim() ? ["annotation"] : []];
  check(contrast.roles.length === expectedRoles.length && new Set(contrast.roles.map((x) => x?.role)).size === expectedRoles.length, "Flexible receipt contrast roles do not match the copy.");
  for (const entry of contrast.roles) {
    check(plain3(entry) && expectedRoles.includes(entry.role) && typeof entry.minimum === "number" && Number.isFinite(entry.minimum) && entry.minimum >= 4.5 && entry.minimum <= 21.001 && Number.isSafeInteger(entry.samples) && entry.samples > 0 && entry.passed === true, "Flexible receipt contains failed or invalid contrast metadata.");
    const spec2 = entry.role === "cta" ? o.cta.text : { mode: o.textColors[entry.role === "annotation" ? "kicker" : entry.role] === "auto" ? "auto" : "palette", value: o.textColors[entry.role === "annotation" ? "kicker" : entry.role] };
    check(validText(entry.color, spec2), "Flexible receipt text colour does not match the selected palette role.");
    if (entry.role === "cta") check(sameColour(entry.color, action.text), "CTA contrast colour does not match its text.");
  }
}

// font-catalog.js
var rows = [
  ["anton", "Anton", [400], "display", "anton"],
  ["oswald", "Oswald", [400, 600, 700], "sans-serif", "oswald"],
  ["archivo-black", "Archivo Black", [400], "display", "archivoblack"],
  ["libre-franklin", "Libre Franklin", [400, 600, 800], "sans-serif", "librefranklin"],
  ["roboto-slab", "Roboto Slab", [400, 600, 800], "serif", "robotoslab"],
  ["sora", "Sora", [400, 600, 800], "sans-serif", "sora"],
  ["dm-sans", "DM Sans", [400, 600, 800], "sans-serif", "dmsans"],
  ["manrope", "Manrope", [400, 600, 800], "sans-serif", "manrope"],
  ["space-grotesk", "Space Grotesk", [400, 600, 700], "sans-serif", "spacegrotesk"],
  ["lora", "Lora", [400, 600, 700], "serif", "lora"]
];
var FONT_CATALOG = Object.freeze(rows.map(([id, family, weights, category, path]) => Object.freeze({ id, family, weights: Object.freeze(weights), category, licenseUrl: `https://raw.githubusercontent.com/google/fonts/main/ofl/${path}/OFL.txt` })));
var getCatalogFont = (id) => FONT_CATALOG.find((font) => font.id === id);

// font-service.js
import { createHash } from "node:crypto";
import { brotliDecompressSync } from "node:zlib";
var MAX_FONT_BYTES = 2 * 1024 * 1024;
var MAX_FAMILY_BYTES = 8 * 1024 * 1024;
var ensure = (condition, message) => {
  if (!condition) throw new StudioError(message, "font-invalid");
};
var fontDigest = (bytes) => createHash("sha256").update(bytes).digest("hex");
var TAGS = "cmap head hhea hmtx maxp name OS/2 post cvt_ fpgm glyf loca prep CFF_ VORG EBDT EBLC gasp hdmx kern LTSH PCLT VDMX vhea vmtx BASE GDEF GPOS GSUB EBSC JSTF MATH CBDT CBLC COLR CPAL SVG_ sbix acnt avar bdat bloc bsln cvar fdsc feat fmtx fvar gvar hsty just lcar mort morx opbd prop trak Zapf Silf Glat Gloc Feat Sill".split(" ").map((s) => s.replace(/_/g, " "));
function tableCmap(bytes) {
  ensure(bytes.length >= 12, "The font file is truncated.");
  const magic = bytes.toString("ascii", 0, 4);
  if (magic === "wOF2") {
    ensure(bytes.length >= 48 && bytes.readUInt32BE(8) === bytes.length && bytes.readUInt16BE(14) === 0 && [65536, 1330926671].includes(bytes.readUInt32BE(4)), "Invalid WOFF2 font header.");
    const count2 = bytes.readUInt16BE(12), inflated = bytes.readUInt32BE(16), compressed = bytes.readUInt32BE(20);
    ensure(count2 > 0 && count2 <= 128 && inflated <= 16 * 1024 * 1024, "The WOFF2 font is too complex.");
    let at = 48, offset = 0, cmap2;
    const base128 = () => {
      let n = 0;
      for (let i = 0; i < 5; i++) {
        ensure(at < bytes.length, "Truncated WOFF2 directory.");
        const b = bytes[at++];
        ensure(!(i === 0 && b === 128) && !(n & 4261412864), "Invalid WOFF2 table size.");
        n = n * 128 + (b & 127);
        if (!(b & 128)) return n;
      }
      throw new StudioError("Invalid WOFF2 table size.", "font-invalid");
    };
    for (let i = 0; i < count2; i++) {
      ensure(at < bytes.length, "Truncated WOFF2 directory.");
      const flags = bytes[at++], index = flags & 63, version = flags >> 6;
      let tag = TAGS[index];
      if (index === 63) {
        ensure(at + 4 <= bytes.length, "Truncated WOFF2 tag.");
        tag = bytes.toString("ascii", at, at + 4);
        at += 4;
      }
      const original = base128();
      let length = original;
      if (tag === "glyf" || tag === "loca") {
        ensure(version === 0 || version === 3, "Unsupported WOFF2 outline transformation.");
        if (version === 0) length = base128();
      } else {
        ensure(version === 0 || tag === "hmtx" && version === 1, "Unsupported WOFF2 table transformation.");
        if (version !== 0) length = base128();
      }
      if (tag === "cmap") {
        ensure(!cmap2 && original > 0, "Invalid WOFF2 cmap.");
        cmap2 = { offset, length };
      }
      offset += length;
      ensure(offset <= 16 * 1024 * 1024, "The WOFF2 font expands beyond the safety limit.");
    }
    ensure(cmap2 && at + compressed <= bytes.length, "The WOFF2 font has no usable cmap.");
    let raw;
    try {
      raw = brotliDecompressSync(bytes.subarray(at, at + compressed), { maxOutputLength: 16 * 1024 * 1024 });
    } catch {
      throw new StudioError("The WOFF2 compressed tables are invalid.", "font-invalid");
    }
    ensure(raw.length === offset, "Invalid WOFF2 table lengths.");
    return { cmap: raw.subarray(cmap2.offset, cmap2.offset + cmap2.length), mime: "font/woff2" };
  }
  ensure(bytes.readUInt32BE(0) === 65536, "Unsupported font format; use a valid TTF or WOFF2 face (raw OTF/WOFF/TTC are not supported).");
  const count = bytes.readUInt16BE(4);
  ensure(count > 0 && count <= 128 && 12 + count * 16 <= bytes.length, "Invalid TTF table directory.");
  let cmap;
  for (let i = 0; i < count; i++) {
    const p = 12 + i * 16, start = bytes.readUInt32BE(p + 8), length = bytes.readUInt32BE(p + 12);
    ensure(start + length <= bytes.length, "Truncated TTF table.");
    if (bytes.toString("ascii", p, p + 4) === "cmap") {
      ensure(!cmap, "Duplicate font cmap.");
      cmap = bytes.subarray(start, start + length);
    }
  }
  ensure(cmap, "The font has no cmap.");
  return { cmap, mime: "font/ttf" };
}
function inspectFont(input) {
  const bytes = Buffer.from(input);
  ensure(bytes.length > 0 && bytes.length <= MAX_FONT_BYTES, "Each font face must be no larger than 2 MB.");
  try {
    const { cmap, mime } = tableCmap(bytes);
    ensure(cmap.length >= 4 && cmap.readUInt16BE(0) === 0, "Invalid font cmap.");
    const count = cmap.readUInt16BE(2);
    ensure(count > 0 && count <= 128 && 4 + 8 * count <= cmap.length, "Invalid cmap directory.");
    const points = /* @__PURE__ */ new Set();
    let supported = false;
    for (let i = 0; i < count; i++) {
      const p = 4 + 8 * i, platform = cmap.readUInt16BE(p), encoding = cmap.readUInt16BE(p + 2), at = cmap.readUInt32BE(p + 4);
      if (!(platform === 0 || platform === 3 && (encoding === 1 || encoding === 10))) continue;
      ensure(at + 2 <= cmap.length, "Truncated cmap subtable.");
      const format = cmap.readUInt16BE(at);
      if (format === 12) {
        supported = true;
        ensure(at + 16 <= cmap.length, "Truncated cmap12.");
        const length = cmap.readUInt32BE(at + 4), n = cmap.readUInt32BE(at + 12);
        ensure(length >= 16 + 12 * n && at + length <= cmap.length && n <= 1e5, "Invalid cmap12.");
        let last = -1;
        for (let j = 0; j < n; j++) {
          const q = at + 16 + j * 12, start = cmap.readUInt32BE(q), end = cmap.readUInt32BE(q + 4), gid = cmap.readUInt32BE(q + 8);
          ensure(start > last && end >= start && end <= 1114111, "Invalid cmap range.");
          last = end;
          for (let cp = start; cp <= end; cp++) if (gid + cp - start > 0 && !(cp >= 55296 && cp <= 57343)) points.add(cp);
        }
      } else if (format === 4) {
        supported = true;
        ensure(at + 16 <= cmap.length, "Truncated cmap4.");
        const length = cmap.readUInt16BE(at + 2), n = cmap.readUInt16BE(at + 6) / 2;
        ensure(Number.isInteger(n) && n > 0 && 16 + 8 * n <= length && at + length <= cmap.length, "Invalid cmap4.");
        const ends = at + 14, starts = ends + 2 * n + 2, deltas = starts + 2 * n, ranges2 = deltas + 2 * n;
        let last = -1;
        for (let j = 0; j < n; j++) {
          const start = cmap.readUInt16BE(starts + 2 * j), end = cmap.readUInt16BE(ends + 2 * j), delta = cmap.readInt16BE(deltas + 2 * j), range = cmap.readUInt16BE(ranges2 + 2 * j);
          ensure(start > last && end >= start, "Invalid cmap4 segments.");
          last = end;
          for (let cp = start; cp <= end && cp < 65535; cp++) {
            let gid;
            if (range) {
              const q = ranges2 + 2 * j + range + 2 * (cp - start);
              ensure(q + 2 <= at + length, "Invalid cmap glyph offset.");
              gid = cmap.readUInt16BE(q);
              if (gid) gid = gid + delta & 65535;
            } else gid = cp + delta & 65535;
            if (gid && !(cp >= 55296 && cp <= 57343)) points.add(cp);
          }
        }
      }
    }
    ensure(supported && points.size, "This font has no supported Unicode cmap (format 4 or 12 required).");
    for (let cp = 32; cp <= 126; cp++) ensure(points.has(cp), "The selected face does not cover the fixed basic Latin repertoire.");
    const coverage = [];
    for (const cp of [...points].sort((a, b) => a - b)) {
      const tail = coverage.at(-1);
      if (tail && tail[1] + 1 === cp) tail[1] = cp;
      else coverage.push([cp, cp]);
    }
    ensure(coverage.length <= 4096, "The font cmap is too fragmented.");
    return { mime, bytes: bytes.length, sha256: fontDigest(bytes), coverage };
  } catch (error) {
    if (error instanceof StudioError) throw error;
    throw new StudioError("The font tables are malformed or unsupported.", "font-invalid");
  }
}
function cssUrlFor(font) {
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family).replace(/%20/g, "+")}:wght@${font.weights.join(";")}&display=swap`;
}
async function fetchBounded(url, maxBytes, { fetcher = globalThis.fetch, signal, timeoutMs = 15e3, kind = "font", licenseUrl } = {}) {
  const parsed = new URL(url);
  ensure(parsed.protocol === "https:" && !parsed.username && !parsed.password && !parsed.port && (kind === "css" ? parsed.hostname === "fonts.googleapis.com" && parsed.pathname === "/css2" : kind === "license" ? url === licenseUrl && parsed.hostname === "raw.githubusercontent.com" && /^\/google\/fonts\/main\/ofl\/[a-z0-9]+\/OFL.txt$/.test(parsed.pathname) : parsed.hostname === "fonts.gstatic.com" && !parsed.search && !parsed.hash && /^\/s\/[A-Za-z0-9/_.,-]+\.(?:ttf|woff2)$/.test(parsed.pathname)), "The font provider returned an unapproved URL.");
  const abort = new AbortController();
  const cancel = () => abort.abort();
  signal?.addEventListener("abort", cancel, { once: true });
  if (signal?.aborted) abort.abort();
  const timeout = setTimeout(cancel, timeoutMs);
  let reader;
  try {
    const response = await fetcher(url, { method: "GET", redirect: "error", signal: abort.signal, headers: { "user-agent": "Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36" } });
    ensure(response.ok && !response.redirected && response.status < 300, "The font provider could not supply the selected family.");
    ensure(Number(response.headers.get("content-length") || 0) <= maxBytes, "The font provider response exceeds the safety limit.");
    reader = response.body?.getReader();
    ensure(reader, "The font provider returned an empty response.");
    let size = 0;
    const chunks = [];
    const read = async () => {
      while (true) {
        const part = await reader.read();
        if (part.done) break;
        size += part.value.length;
        ensure(size <= maxBytes, "The font provider response exceeds the safety limit.");
        chunks.push(part.value);
      }
      return Buffer.concat(chunks);
    };
    return await Promise.race([read(), new Promise((_, reject) => {
      if (abort.signal.aborted) reject(new Error("aborted"));
      else abort.signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
    })]);
  } catch (error) {
    if (error instanceof StudioError) throw error;
    throw new StudioError("The font download failed or timed out. No font was imported.", "font-download");
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", cancel);
    if (reader) {
      try {
        await reader.cancel();
      } catch {
      }
      try {
        reader.releaseLock();
      } catch {
      }
    }
    abort.abort();
  }
}
async function downloadCatalogFamily(catalogId, options = {}) {
  const font = getCatalogFont(catalogId);
  ensure(font, "Choose a font from the curated catalogue.");
  const cssUrl = cssUrlFor(font), css = (await fetchBounded(cssUrl, 128 * 1024, { ...options, kind: "css" })).toString("utf8");
  const notice = (await fetchBounded(font.licenseUrl, 64 * 1024, { ...options, kind: "license", licenseUrl: font.licenseUrl })).toString("utf8");
  ensure(/SIL OPEN FONT LICENSE Version 1\.1/i.test(notice) && notice.includes("Copyright"), "The curated font licence could not be verified.");
  const blocks = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map((m) => m[1]);
  const files = /* @__PURE__ */ new Map(), faces2 = [];
  let total = 0;
  for (const weight of font.weights) {
    const block = blocks.find((b) => /font-style:\s*normal\s*;/.test(b) && new RegExp(`font-weight:\\s*${weight}\\s*;`).test(b) && (/unicode-range:\s*U\+0{1,4}-0{0,2}FF\b/i.test(b) || !b.includes("unicode-range:")));
    ensure(block, "The provider did not return the approved normal Latin weights.");
    const family = /font-family:\s*['"]?([^;'"\n]+)['"]?\s*;/.exec(block);
    ensure(family && family[1] === font.family, "The provider returned a different font family.");
    const urls = [...block.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)];
    ensure(urls.length === 1, "The font stylesheet has an unsupported source.");
    const url = urls[0][1];
    if (!files.has(url)) {
      const bytes = await fetchBounded(url, MAX_FONT_BYTES, options);
      total += bytes.length;
      ensure(total <= MAX_FAMILY_BYTES, "The family exceeds the 8 MB import limit.");
      files.set(url, { ...inspectFont(bytes), dataUrl: `data:${tableCmap(bytes).mime};base64,${bytes.toString("base64")}`, sourceUrl: url });
    }
    faces2.push({ weight, style: "normal", ...files.get(url) });
  }
  return { family: font.family, catalogId: font.id, source: "google-fonts", license: "SIL OFL 1.1", licenseUrl: font.licenseUrl, licenseNotice: notice, provenance: { cssUrl, licenseUrl: font.licenseUrl, fetchedAt: (/* @__PURE__ */ new Date()).toISOString() }, faces: faces2 };
}
function verifyFontFile(record, face2, companyId) {
  ensure(record && record.companyId === companyId && record.id === face2.assetId && record.bytes === face2.bytes, "The cached font does not belong to this family.");
  const match = /^data:(font\/(?:woff2|ttf));base64,([A-Za-z0-9+/]+={0,2})$/.exec(record.dataUrl);
  ensure(match && match[1] === face2.mime && match[2].length % 4 === 0, "The cached font format is invalid.");
  const bytes = Buffer.from(match[2], "base64");
  ensure(bytes.length === face2.bytes && bytes.length <= MAX_FONT_BYTES && bytes.toString("base64") === match[2] && fontDigest(bytes) === face2.sha256, "The cached font integrity check failed.");
  return { dataUrl: record.dataUrl, ...face2 };
}

// welcome-artwork-task.js
import { createHash as createHash2 } from "node:crypto";
import { constants } from "node:fs";
import { lstat, open, realpath } from "node:fs/promises";
import { join, parse, resolve } from "node:path";
import { fileURLToPath } from "node:url";
var WELCOME_TASK_ID = "welcome-home-20261110-01";
var WELCOME_PROMPT = "Premium editorial studio still life for the welcome area of a professional brand design application. A sculptural, tactile arrangement of blank ivory print cards and folded paper planes, one translucent cobalt-blue acrylic slab and one warm orange material swatch, precise layered composition and beautiful restrained studio lighting, soft grounded shadows, subtle physical texture, cool pearl-neutral background. Objects concentrated in the right two-thirds, generous clean breathing space on the left and around all edges, wide horizontal composition, sophisticated macOS creative-tool sensibility, realistic materials not a UI mockup. No letters, no text, no typography, no logos, no screens, no people, no client brands, no charts, no symbols, no watermark. Decorative editorial illustration, not a real customer project.";
var digest2 = (value) => createHash2("sha256").update(value).digest("hex");
var WELCOME_PROMPT_SHA256 = digest2(WELCOME_PROMPT);
var WELCOME_ASSET_DIRECTORY = fileURLToPath(new URL("./assets/welcome/", import.meta.url));
var WELCOME_CONTROL_DIRECTORY = fileURLToPath(new URL("./output/welcome-task/", import.meta.url));
var ASSET_ROOT = resolve(WELCOME_ASSET_DIRECTORY);
var CONTROL_ROOT = resolve(WELCOME_CONTROL_DIRECTORY);
var ENDPOINT = "https://api.openai.com/v1/images/generations";
var MAX_IMAGE_BYTES = 8 * 1024 * 1024;
var MAX_RESPONSE_BYTES = 13 * 1024 * 1024;
var MAX_APPROVAL_BYTES = 4096;
var TIMEOUT_MS = 24e4;
var OUTPUT_ROOTS = Object.freeze({ "attempt.json": CONTROL_ROOT, "status.json": CONTROL_ROOT, "manifest.json": ASSET_ROOT, "hero.png": ASSET_ROOT });
var LABEL = "AI-generated editorial illustration";
var failure = (code) => Object.assign(new Error("Welcome artwork task could not complete."), { taskCode: code });
var ensure2 = (condition, code) => {
  if (!condition) throw failure(code);
};
var cancelled = (signal) => ensure2(!signal?.aborted, "aborted");
async function assertRoot(root) {
  ensure2(root === ASSET_ROOT || root === CONTROL_ROOT, "unsafe-path");
  let current = parse(root).root;
  for (const segment of root.slice(current.length).split("/").filter(Boolean)) {
    current = join(current, segment);
    const info = await lstat(current);
    ensure2(info.isDirectory() && !info.isSymbolicLink(), "unsafe-path");
  }
  ensure2(await realpath(root) === root, "unsafe-path");
}
function outputRoot(name2) {
  ensure2(Object.hasOwn(OUTPUT_ROOTS, name2), "unsafe-path");
  return OUTPUT_ROOTS[name2];
}
async function exists(name2) {
  const root = outputRoot(name2);
  await assertRoot(root);
  try {
    await lstat(join(root, name2));
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}
async function readApproval() {
  await assertRoot(CONTROL_ROOT);
  const handle = await open(join(CONTROL_ROOT, "approved.json"), constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const info = await handle.stat();
    ensure2(info.isFile() && info.size <= MAX_APPROVAL_BYTES, "invalid-approval");
    const bytes = Buffer.alloc(MAX_APPROVAL_BYTES + 1);
    const { bytesRead } = await handle.read(bytes, 0, bytes.length, 0);
    ensure2(bytesRead <= MAX_APPROVAL_BYTES, "invalid-approval");
    let approval;
    try {
      approval = JSON.parse(bytes.subarray(0, bytesRead).toString("utf8"));
    } catch {
      throw failure("invalid-approval");
    }
    ensure2(approval?.approved === true && approval.id === WELCOME_TASK_ID && approval.promptSha256 === WELCOME_PROMPT_SHA256, "invalid-approval");
  } finally {
    await handle.close();
  }
}
async function syncDirectory(root) {
  await assertRoot(root);
  const handle = await open(root, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
  try {
    await handle.sync();
  } finally {
    await handle.close();
  }
}
async function createExclusive(name2, value, onCreate = () => {
}) {
  const root = outputRoot(name2);
  await assertRoot(root);
  const handle = await open(join(root, name2), constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, root === ASSET_ROOT ? 420 : 384);
  onCreate();
  try {
    await handle.writeFile(value);
    await handle.sync();
  } finally {
    await handle.close();
  }
  await syncDirectory(root);
}
var json = (value) => `${JSON.stringify(value, null, 2)}
`;
function abortable(work, signal) {
  return new Promise((accept, reject) => {
    const stop = () => {
      signal.removeEventListener("abort", stop);
      reject(failure("aborted"));
    };
    signal.addEventListener("abort", stop, { once: true });
    Promise.resolve(work).then(
      (value) => {
        signal.removeEventListener("abort", stop);
        accept(value);
      },
      (error) => {
        signal.removeEventListener("abort", stop);
        reject(error);
      }
    );
    if (signal.aborted) stop();
  });
}
var CRC_TABLE = Uint32Array.from({ length: 256 }, (_, n) => {
  for (let i = 0; i < 8; i++) n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
  return n >>> 0;
});
function crc32(bytes) {
  let value = 4294967295;
  for (const byte of bytes) value = CRC_TABLE[(value ^ byte) & 255] ^ value >>> 8;
  return (value ^ 4294967295) >>> 0;
}
function inspectPng(encoded) {
  ensure2(typeof encoded === "string" && encoded.length > 0 && encoded.length <= Math.ceil(MAX_IMAGE_BYTES / 3) * 4 && encoded.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(encoded), "invalid-image");
  const bytes = Buffer.from(encoded, "base64");
  ensure2(bytes.length <= MAX_IMAGE_BYTES && bytes.toString("base64") === encoded && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), "invalid-image");
  let at = 8, width, height, data = false, ended = false;
  while (at < bytes.length) {
    ensure2(at + 12 <= bytes.length, "invalid-image");
    const length = bytes.readUInt32BE(at), end = at + 12 + length;
    ensure2(end <= bytes.length && crc32(bytes.subarray(at + 4, end - 4)) === bytes.readUInt32BE(end - 4), "invalid-image");
    const type = bytes.toString("ascii", at + 4, at + 8);
    if (at === 8) {
      ensure2(type === "IHDR" && length === 13, "invalid-image");
      width = bytes.readUInt32BE(at + 8);
      height = bytes.readUInt32BE(at + 12);
      ensure2(width > 0 && height > 0 && width <= 4096 && height <= 4096 && width * height <= 16 * 1024 * 1024, "invalid-image");
    } else ensure2(type !== "IHDR", "invalid-image");
    if (type === "IDAT") data = true;
    if (type === "IEND") {
      ensure2(length === 0 && end === bytes.length, "invalid-image");
      ended = true;
    }
    at = end;
  }
  ensure2(data && ended, "invalid-image");
  return { bytes, width, height };
}
async function runWelcomeArtworkTask({ model, resolveKey, signal, fetcher = globalThis.fetch }) {
  let claimed = false, submitted = false, providerHttpStatus, reader, body, timer, key;
  const abort = new AbortController();
  const stop = () => abort.abort();
  signal?.addEventListener("abort", stop, { once: true });
  if (signal?.aborted) stop();
  const startedAt = (/* @__PURE__ */ new Date()).toISOString();
  const parameters = Object.freeze({ model, n: 1, size: "1536x1024", quality: "medium", output_format: "png", stream: false });
  const requestBody = JSON.stringify({ ...parameters, prompt: WELCOME_PROMPT });
  const provenance2 = {
    id: WELCOME_TASK_ID,
    prompt: WELCOME_PROMPT,
    promptSha256: WELCOME_PROMPT_SHA256,
    parameters,
    parametersSha256: digest2(JSON.stringify(parameters)),
    requestSha256: digest2(requestBody),
    provider: "OpenAI",
    endpoint: ENDPOINT,
    label: LABEL,
    purpose: "company-agnostic welcome illustration",
    approvedBy: "explicit user selection; matching local approved.json",
    startedAt,
    maxAttempts: 1,
    retryPolicy: "never"
  };
  async function finish(status, code, extra = {}) {
    const result = { id: WELCOME_TASK_ID, status, code, submitted, mayHaveBeenCharged: submitted, ...extra, finishedAt: (/* @__PURE__ */ new Date()).toISOString() };
    if (providerHttpStatus !== void 0) result.providerHttpStatus = providerHttpStatus;
    if (claimed) {
      try {
        await createExclusive("status.json", json(result));
      } catch {
        return { id: WELCOME_TASK_ID, status: "unknown", code: "status-save-failed", submitted, mayHaveBeenCharged: submitted };
      }
    }
    return result;
  }
  try {
    cancelled(abort.signal);
    try {
      await readApproval();
    } catch (error) {
      return { id: WELCOME_TASK_ID, status: "inactive", code: error.code === "ENOENT" ? "approval-missing" : "approval-invalid-or-unsafe" };
    }
    cancelled(abort.signal);
    if (await exists("attempt.json")) return { id: WELCOME_TASK_ID, status: "skipped", code: "attempt-already-claimed" };
    await assertRoot(ASSET_ROOT);
    ensure2(typeof model === "string" && /^gpt-image-[A-Za-z0-9._-]{1,64}$/.test(model), "invalid-model");
    for (const name2 of ["status.json", "manifest.json", "hero.png"]) ensure2(!await exists(name2), "output-already-exists");
    try {
      await createExclusive("attempt.json", json({ ...provenance2, status: "claimed" }), () => {
        claimed = true;
      });
    } catch (error) {
      if (error.code === "EEXIST" && !claimed) return { id: WELCOME_TASK_ID, status: "skipped", code: "attempt-already-claimed" };
      throw error;
    }
    await createExclusive("manifest.json", json(provenance2));
    cancelled(abort.signal);
    timer = setTimeout(stop, TIMEOUT_MS);
    key = await abortable(resolveKey(), abort.signal);
    ensure2(typeof key?.value === "string" && key.value.length > 0, "credential-unavailable");
    cancelled(abort.signal);
    submitted = true;
    const response = await abortable(fetcher(ENDPOINT, {
      method: "POST",
      redirect: "error",
      signal: abort.signal,
      headers: { "content-type": "application/json", authorization: `Bearer ${key.value}` },
      body: requestBody
    }), abort.signal);
    key = void 0;
    body = response.body;
    providerHttpStatus = response.status;
    ensure2(response.ok && !response.redirected && response.status < 300, "provider-rejected");
    const length = Number(response.headers.get("content-length") || 0);
    ensure2(Number.isFinite(length) && length >= 0 && length <= MAX_RESPONSE_BYTES, "response-too-large");
    reader = body?.getReader();
    ensure2(reader, "invalid-response");
    let size = 0;
    const chunks = [];
    while (true) {
      const part = await abortable(reader.read(), abort.signal);
      if (part.done) break;
      size += part.value.length;
      ensure2(size <= MAX_RESPONSE_BYTES, "response-too-large");
      chunks.push(part.value);
    }
    let result;
    try {
      result = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw failure("invalid-response");
    }
    ensure2(Array.isArray(result.data) && result.data.length === 1, "invalid-response");
    const image = inspectPng(result.data[0]?.b64_json);
    cancelled(abort.signal);
    await createExclusive("hero.png", image.bytes);
    return await finish("succeeded", "image-saved", {
      asset: "hero.png",
      mime: "image/png",
      bytes: image.bytes.length,
      sha256: digest2(image.bytes),
      width: image.width,
      height: image.height,
      label: LABEL
    });
  } catch (error) {
    const safeCodes = ["aborted", "invalid-model", "unsafe-path", "output-already-exists", "invalid-image", "invalid-response", "response-too-large", "provider-rejected", "credential-unavailable"];
    const code = safeCodes.includes(error?.taskCode) ? error.taskCode : submitted ? "request-or-save-failed" : "local-preflight-failed";
    return await finish(submitted ? "unknown" : "failed", code);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", stop);
    key = void 0;
    try {
      const pending = reader ? reader.cancel() : body?.cancel();
      pending?.catch(() => {
      });
    } catch {
    }
    try {
      reader?.releaseLock();
    } catch {
    }
    abort.abort();
  }
}

// index.js
var name = "brand-studio";
var inject = ["connection", "credentials", "storageDomain", "webServer"];
var PRIMARY_REF = "BRAND_STUDIO_OPENAI_API_KEY";
var FALLBACK_REF = "OPENAI_API_KEY";
var MAX_ASSET_BYTES = 8 * 1024 * 1024;
var MAX_TOTAL_ASSETS = 96 * 1024 * 1024;
var stateSchema = z.unknown().refine((value) => {
  try {
    validateState(value);
    return true;
  } catch {
    return false;
  }
}, "Invalid Brand Studio state");
var assetSchema = z.object({ id: z.string(), companyId: z.string(), dataUrl: z.string().max(Math.ceil(MAX_ASSET_BYTES * 4 / 3) + 100), bytes: z.number().int().positive().max(MAX_ASSET_BYTES) });
var spec = { name: "brand_studio", version: 1, tables: { state: { valueSchema: stateSchema }, assets: { valueSchema: assetSchema } } };
var object2 = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var safeError = (error) => error instanceof StudioError ? error.message : "The operation could not finish. Your saved work is retained. Check the connection and try again.";
var failure2 = (message, code = "invalid") => ({ ok: false, error: { code: `brand-studio/${code}`, message, details: {} } });
function inspectImage(dataUrl) {
  check(typeof dataUrl === "string" && dataUrl.length <= Math.ceil(MAX_ASSET_BYTES * 4 / 3) + 100, "Choose an image no larger than 8 MB.");
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  check(match && match[2].length % 4 === 0, "Use a base64 PNG, JPEG, or WebP image. SVG and other files are not supported.");
  const bytes = Buffer.from(match[2], "base64");
  check(bytes.length > 0 && bytes.length <= MAX_ASSET_BYTES && bytes.toString("base64") === match[2], "The image is invalid or larger than 8 MB.");
  const mime = match[1];
  const valid = mime === "image/png" ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) : mime === "image/jpeg" ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  check(valid, "The image contents do not match the selected image format.");
  return { mime, bytes: bytes.length };
}
async function apply(ctx) {
  const prior = ctx.storageDomain.get(spec.name);
  if (prior) await prior.close();
  const domain = await ctx.storageDomain.open(spec);
  const states = domain.table("state"), assets = domain.table("assets");
  let state = states.get("main") ?? createState();
  validateState(state);
  let mutation = Promise.resolve();
  let stopped = false;
  let pumping;
  let pumpRequested = false;
  const controllers = /* @__PURE__ */ new Map();
  const fontImports = /* @__PURE__ */ new Map();
  const welcomeArtworkAbort = new AbortController();
  let welcomeArtwork;
  let disposeRpc = () => {
  };
  ctx.effect(() => async () => {
    stopped = true;
    disposeRpc();
    welcomeArtworkAbort.abort();
    for (const abort of controllers.values()) abort.abort();
    await welcomeArtwork;
    try {
      await pumping;
      await Promise.allSettled([...fontImports.values()]);
      await mutation;
      await serial(async () => {
        const next = recoverJobs(state);
        if (next !== state) await persist(next);
      });
    } finally {
      await domain.close();
    }
  });
  async function persist(next) {
    validateState(next);
    await states.put("main", next);
    state = next;
  }
  function serial(operation) {
    const result = mutation.then(operation);
    mutation = result.then(() => void 0, () => void 0);
    return result;
  }
  const recovered = recoverJobs(state);
  if (recovered !== state || !states.get("main")) await persist(recovered);
  function publicState() {
    const result = clone3(state);
    result.jobs = result.jobs.map(({ snapshot, ...job }) => job);
    return result;
  }
  async function credentialStatus() {
    const primary = await ctx.credentials.describe(PRIMARY_REF);
    if (primary.configured) return { credentialConfigured: true, credentialRef: PRIMARY_REF, model: state.settings.model, ...state.settings.modelCatalog, ...state.settings.modelCatalog ? { currentAvailable: state.settings.modelCatalog.error ? null : state.settings.modelCatalog.imageModels.includes(state.settings.model) } : {} };
    const fallback = await ctx.credentials.describe(FALLBACK_REF);
    return { credentialConfigured: fallback.configured, credentialRef: fallback.configured ? FALLBACK_REF : PRIMARY_REF, model: state.settings.model, ...state.settings.modelCatalog, ...state.settings.modelCatalog ? { currentAvailable: state.settings.modelCatalog.error ? null : state.settings.modelCatalog.imageModels.includes(state.settings.model) } : {} };
  }
  async function resolveKey() {
    for (const ref of [PRIMARY_REF, FALLBACK_REF]) {
      const hit = await ctx.credentials.resolve(ref);
      if (hit?.value) return { value: hit.value, ref };
    }
    throw new StudioError("Add an OpenAI API key in Brand Studio settings before creating images.", "credential-missing");
  }
  async function discoverModels() {
    const key = await resolveKey();
    let catalogue;
    try {
      const response = await fetch("https://api.openai.com/v1/models", { method: "GET", headers: { authorization: `Bearer ${key.value}` }, signal: AbortSignal.timeout(15e3) });
      if (!response.ok) {
        const diagnostic = await imageFailure(response);
        throw new StudioError(`Model catalogue check failed: ${diagnostic.error}`);
      }
      const reader = response.body?.getReader();
      check(reader, "The model catalogue returned no data.");
      let size = 0;
      const chunks = [];
      try {
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          size += part.value.length;
          check(size <= 2 * 1024 * 1024, "The model catalogue was too large to inspect safely.");
          chunks.push(part.value);
        }
      } finally {
        reader.releaseLock();
      }
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      check(Array.isArray(body.data), "The model catalogue has an unexpected format.");
      const imageModels = [...new Set(body.data.map((m) => m?.id).filter((id) => typeof id === "string" && /^gpt-image-[A-Za-z0-9._-]{1,64}$/.test(id)))].sort();
      catalogue = { imageModels, currentAvailable: imageModels.includes(state.settings.model), checkedAt: (/* @__PURE__ */ new Date()).toISOString() };
    } catch (error) {
      catalogue = { imageModels: [], currentAvailable: null, checkedAt: (/* @__PURE__ */ new Date()).toISOString(), error: safeError(error) };
    }
    await serial(async () => {
      const next = clone3(state);
      next.settings.imageModels = catalogue.imageModels;
      next.settings.modelCatalog = catalogue;
      next.revision++;
      await persist(next);
    });
    return catalogue;
  }
  async function saveAsset(companyId, name2, role, dataUrl) {
    check(state.companies.some((c) => c.id === companyId && !c.archived), "Choose an active company before saving an image.");
    check(typeof name2 === "string" && name2.trim().length > 0 && name2.length <= 180, "Give the image a name of 1\u2013180 characters.");
    check(["logo", "product", "reference", "generated", "backdrop", "foreground"].includes(role), "Choose logo, product, reference, backdrop, or foreground as the image role.");
    const info = inspectImage(dataUrl);
    const total = Array.from(assets.entries()).reduce((sum, [, a]) => sum + a.bytes, 0);
    check(total + info.bytes <= MAX_TOTAL_ASSETS, "The local image library is full (96 MB). This first version does not automatically remove stored images.");
    const id = randomUUID2();
    const record = assetSchema.parse({ id, companyId, dataUrl, bytes: info.bytes });
    await assets.put(id, record);
    return { id, companyId, name: name2.trim(), role, mime: info.mime, bytes: info.bytes, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
  function fontCompany(companyId) {
    check(typeof companyId === "string" && state.companies.some((c) => c.id === companyId && !c.archived), "Choose an active company before importing fonts.");
  }
  async function importFont(companyId, catalogId) {
    fontCompany(companyId);
    check(typeof catalogId === "string" && getCatalogFont(catalogId), "Choose a font from the curated catalogue.");
    const existing = (state.fonts ?? []).find((f) => f.companyId === companyId && f.catalogId === catalogId);
    if (existing) return existing.id;
    check((state.fonts ?? []).filter((f) => f.companyId === companyId).length < 24, "A company can import at most 24 font families.");
    const key = `${companyId}:${catalogId}`;
    if (fontImports.has(key)) return fontImports.get(key);
    const abort = new AbortController();
    controllers.set(key, abort);
    const pending = (async () => {
      const downloaded = await downloadCatalogFamily(catalogId, { signal: abort.signal });
      return serial(async () => {
        check(!stopped, "Brand Studio closed before the font could be saved.");
        fontCompany(companyId);
        const duplicate = (state.fonts ?? []).find((f) => f.companyId === companyId && f.catalogId === catalogId);
        if (duplicate) return duplicate.id;
        check((state.fonts ?? []).filter((f) => f.companyId === companyId).length < 24, "A company can import at most 24 font families.");
        const binaries = /* @__PURE__ */ new Map(), faces2 = [];
        for (const { dataUrl, sourceUrl, ...face2 } of downloaded.faces) {
          const id2 = randomUUID2(), binary = assetSchema.parse({ id: id2, companyId, dataUrl, bytes: face2.bytes });
          binaries.set(id2, binary);
          faces2.push({ ...face2, assetId: binary.id });
        }
        const total = Array.from(assets.entries()).reduce((sum, [, a]) => sum + a.bytes, 0);
        check(total + [...binaries.values()].reduce((sum, a) => sum + a.bytes, 0) <= MAX_TOTAL_ASSETS, "The local asset library is full (96 MB, including fonts).");
        const { faces: ignored, ...metadata2 } = downloaded;
        const id = randomUUID2(), record = validateFontRecord({ ...metadata2, id, companyId, faces: faces2, importedAt: (/* @__PURE__ */ new Date()).toISOString() });
        const next = addFont(state, record), written = [];
        try {
          for (const binary of binaries.values()) {
            written.push(binary.id);
            await assets.put(binary.id, binary);
          }
          await persist(next);
        } catch (error) {
          for (const assetId of written) {
            try {
              await assets.delete(assetId);
            } catch {
            }
          }
          throw error;
        }
        return id;
      });
    })().finally(() => {
      fontImports.delete(key);
      controllers.delete(key);
    });
    fontImports.set(key, pending);
    return pending;
  }
  async function markJob(jobId, patch) {
    return serial(async () => {
      await persist(updateJob(state, jobId, patch));
    });
  }
  async function processJob(jobId) {
    let job = state.jobs.find((j) => j.id === jobId);
    if (!job || job.status !== "queued" || stopped) return;
    let key;
    try {
      key = await resolveKey();
    } catch (error) {
      await markJob(job.id, { status: "failed", error: safeError(error), finishedAt: (/* @__PURE__ */ new Date()).toISOString() });
      return;
    }
    if (stopped) return;
    const abort = new AbortController();
    controllers.set(job.id, abort);
    let submitted = false, receivedSuccess = false;
    const timeout = setTimeout(() => abort.abort(), 24e4);
    try {
      await serial(async () => {
        job = state.jobs.find((j) => j.id === jobId);
        check(job && job.status === "queued" && !stopped, "This image request is no longer queued.");
        const { company, campaign } = assertGeneratable(state, job.snapshot.post, (/* @__PURE__ */ new Date()).toISOString(), job.id);
        check(company.guidelines === job.snapshot.company.guidelines && campaign?.offer === job.snapshot.campaign?.offer && campaign?.offerExpiry === job.snapshot.campaign?.offerExpiry, "The brand guidelines or offer changed after this design was queued. Review the post before creating it again. No image request was sent.");
        await persist(updateJob(state, job.id, { status: "running", credentialRef: key.ref, startedAt: (/* @__PURE__ */ new Date()).toISOString() }));
      });
      if (stopped) throw new StudioError("Brand Studio closed before this request was submitted. No image request was sent.");
      submitted = true;
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        signal: abort.signal,
        headers: { "content-type": "application/json", authorization: `Bearer ${key.value}` },
        body: JSON.stringify({ model: job.snapshot.model, prompt: compilePrompt(job.snapshot), n: 1, size: generationSize(job.snapshot.post.format), quality: "medium", output_format: "png", stream: false })
      });
      if (!response.ok) {
        const diagnostic = await imageFailure(response);
        await markJob(job.id, { status: response.status >= 500 || response.status === 408 ? "unknown" : "failed", ...diagnostic, finishedAt: (/* @__PURE__ */ new Date()).toISOString() });
        return;
      }
      receivedSuccess = true;
      check(Number(response.headers.get("content-length") || 0) <= 13 * 1024 * 1024, "The generated image exceeds the 8 MB storage limit. OpenAI may have charged this request.");
      const reader = response.body?.getReader();
      check(reader, "OpenAI returned no image body.");
      let size = 0;
      const chunks = [];
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.length;
          check(size <= 13 * 1024 * 1024, "The generated image exceeds the local size limit. OpenAI may have charged this request.");
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }
      const result = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      check(Array.isArray(result.data) && typeof result.data[0]?.b64_json === "string", "OpenAI did not return a usable image. This request may have been charged.");
      await serial(async () => {
        const asset = await saveAsset(job.companyId, `Generated design ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`, "generated", `data:image/png;base64,${result.data[0].b64_json}`);
        const completed = finishJob(state, job.id, asset);
        await persist(completed.state);
      });
    } catch (error) {
      await markJob(job.id, { status: submitted && !receivedSuccess ? "unknown" : "failed", error: receivedSuccess ? "OpenAI returned a result, but it could not be saved locally. This request may have been charged. No retry was made." : submitted ? "The connection ended before OpenAI confirmed the result. This request may have been charged. No retry was made." : safeError(error), finishedAt: (/* @__PURE__ */ new Date()).toISOString() });
    } finally {
      clearTimeout(timeout);
      abort.abort();
      controllers.delete(job.id);
      key = void 0;
    }
  }
  function pump() {
    if (stopped) return;
    if (pumping) {
      pumpRequested = true;
      return;
    }
    pumpRequested = false;
    pumping = (async () => {
      while (!stopped) {
        const job = state.jobs.find((j) => j.status === "queued");
        if (!job) break;
        await processJob(job.id);
      }
    })().catch(() => {
    }).finally(() => {
      pumping = void 0;
      if (pumpRequested && !stopped) pump();
    });
  }
  async function handle(endpoint, payload) {
    if (stopped) return failure2("Brand Studio is closing. Reopen it after the host restarts.", "closing");
    if (!object2(payload)) return failure2("Supply an object as the request payload.");
    try {
      let value;
      if (endpoint === "state") value = publicState();
      else if (endpoint === "status") value = await credentialStatus();
      else if (endpoint === "models.check") value = await discoverModels();
      else if (endpoint === "fonts.catalog") {
        check(Object.keys(payload).length === 0, "The font catalogue takes no parameters.");
        value = { families: clone3(FONT_CATALOG) };
      } else if (endpoint === "fonts.import") {
        check(Object.keys(payload).every((k) => ["companyId", "catalogId"].includes(k)), "Only companyId and catalogId are accepted for font imports.");
        const fontId = await importFont(payload.companyId, payload.catalogId);
        value = { state: publicState(), fontId };
      } else if (endpoint === "fonts.file") {
        check(Object.keys(payload).every((k) => ["fontId", "weight"].includes(k)), "Choose an imported font and weight.");
        check(typeof payload.fontId === "string" && Number.isInteger(payload.weight), "Choose an imported font and exact weight.");
        const found = (state.fonts ?? []).find((f) => f.id === payload.fontId);
        check(found, "The imported font no longer exists.", "not-found");
        const font = validateFontRecord(found), face2 = font.faces.find((f) => f.weight === payload.weight && f.style === "normal");
        check(face2, "This weight was not imported.", "not-found");
        value = verifyFontFile(assets.get(face2.assetId), face2, font.companyId);
      } else if (endpoint === "command") {
        check(typeof payload.type === "string" && object2(payload.data), "Choose an action and supply its data.");
        if (payload.type === "asset.save") {
          value = await serial(async () => {
            check(payload.data.role !== "generated", "Generated image assets can only be created by the backend.");
            const asset = await saveAsset(payload.data.companyId, payload.data.name, payload.data.role ?? "reference", payload.data.dataUrl);
            await persist(addAsset(state, asset));
            return { state: publicState(), assetId: asset.id };
          });
        } else {
          value = await serial(async () => {
            const result = applyCommand(state, payload.type, payload.data);
            if (result.state !== state) await persist(result.state);
            const { state: ignored, ...metadata2 } = result;
            return { state: publicState(), ...metadata2 };
          });
        }
      } else if (endpoint === "asset") {
        check(typeof payload.id === "string", "Choose an image.");
        const metadata2 = state.assets.find((a) => a.id === payload.id);
        check(metadata2, "The image no longer exists.", "not-found");
        const record = assets.get(payload.id);
        check(record && record.companyId === metadata2.companyId, "The image is unavailable.", "not-found");
        value = { dataUrl: record.dataUrl };
      } else if (endpoint === "prompt") {
        const snapshot = snapshotForPost(state, payload.postId);
        value = { prompt: compilePrompt(snapshot), model: snapshot.model, size: generationSize(snapshot.post.format) };
      } else if (endpoint === "credential.save") {
        check(typeof payload.key === "string" && payload.key.trim().length >= 10 && payload.key.length <= 1024, "Enter a valid OpenAI API key.");
        await ctx.credentials.set(PRIMARY_REF, payload.key.trim());
        value = await credentialStatus();
      } else if (endpoint === "credential.delete") {
        await ctx.credentials.unset(PRIMARY_REF);
        value = await credentialStatus();
      } else if (endpoint === "generate") {
        const status = await credentialStatus();
        check(status.credentialConfigured, "Add an OpenAI API key before creating images.", "credential-missing");
        value = await serial(async () => {
          const result = queueJobs(state, payload);
          if (result.state !== state) await persist(result.state);
          const ids = new Set(result.jobs.map((j) => j.id));
          return { state: publicState(), jobs: publicState().jobs.filter((j) => ids.has(j.id)), existing: !!result.existing };
        });
        pump();
      } else return failure2("Unknown studio operation.", "not-found");
      return { ok: true, value };
    } catch (error) {
      return failure2(safeError(error), error instanceof StudioError ? error.code : "operation-failed");
    }
  }
  const routes = ["state", "status", "command", "asset", "prompt", "credential.save", "credential.delete", "generate", "models.check", "fonts.catalog", "fonts.import", "fonts.file"].map((endpoint) => ctx.connection.fetch.register({
    path: `/api/brand-studio/${endpoint}`,
    methods: ["POST"],
    requestBody: "buffered",
    async fetch(request) {
      if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return Response.json(failure2("Use JSON for studio requests."), { status: 415 });
      let payload;
      try {
        payload = await request.json();
      } catch {
        return Response.json(failure2("Supply valid JSON."), { status: 400 });
      }
      return Response.json(await handle(endpoint, payload), { headers: { "cache-control": "no-store" } });
    }
  }));
  disposeRpc = () => {
    for (const dispose of routes) dispose();
  };
  if (state.jobs.some((j) => j.providerParam === "model") && !state.settings.modelCatalog?.checkedAt) {
    try {
      await discoverModels();
    } catch {
    }
  }
  if (state.settings.model === "gpt-image-1" && state.jobs.some((j) => j.providerParam === "model") && state.settings.imageModels?.includes("gpt-image-2.6-flare")) {
    await serial(async () => {
      const next = clone3(state);
      next.settings.model = "gpt-image-2.6-flare";
      next.settings.modelCatalog = { ...next.settings.modelCatalog, currentAvailable: true };
      next.revision++;
      await persist(next);
    });
  }
  welcomeArtwork = runWelcomeArtworkTask({ model: state.settings.model, resolveKey, signal: welcomeArtworkAbort.signal }).catch(() => void 0);
}
export {
  apply,
  inject,
  name
};
