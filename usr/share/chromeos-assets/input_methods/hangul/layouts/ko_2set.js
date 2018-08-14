// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var KO_LAYOUT = {
  'id': 'ko_2set',
  'title': '한국어',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '\u3142\u3148\u3137\u3131\u3145\u315B\u3155\u3151\u3150\u3154[]\\' +
          '\u3141\u3134\u3147\u3139\u314E\u3157\u3153\u314F\u3163;\'' +
          '\u314B\u314C\u314A\u314D\u3160\u315C\u3161,\./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '\u3143\u3149\u3138\u3132\u3146\u315B\u3155\u3151\u3152\u3156{}|' +
          '\u3141\u3134\u3147\u3139\u314E\u3157\u3153\u314F\u3163:"' +
          '\u314B\u314C\u314A\u314D\u3160\u315C\u3161<>?'
    },
    'l,cl': {
      '': '`1234567890-=' +
          '\u3143\u3149\u3138\u3132\u3146\u315B\u3155\u3151\u3152\u3156[]\\' +
          '\u3141\u3134\u3147\u3139\u314E\u3157\u3153\u314F\u3163;\'' +
          '\u314B\u314C\u314A\u314D\u3160\u315C\u3161,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          '\u3142\u3148\u3137\u3131\u3145\u315B\u3155\u3151\u3150\u3154{}|' +
          '\u3141\u3134\u3147\u3139\u314E\u3157\u3153\u314F\u3163:"' +
          '\u314B\u314C\u314A\u314D\u3160\u315C\u3161<>?'
    }
  }
};

// Load the layout and inform the keyboard to switch layout if necessary. cibu
cros_vk_loadme(KO_LAYOUT);
