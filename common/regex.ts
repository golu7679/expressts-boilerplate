export const USER_MENTIONED_IN_COMMENT = /\(([^)]+)\)/g;
export const USED_HASHTAG_NAMES = /(?<=#).*?(?=( |$))/g;
export const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const NAME = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
export const USERNAME_REGEX = /^(?=.{2,20}$)(?![.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![.])$/;
