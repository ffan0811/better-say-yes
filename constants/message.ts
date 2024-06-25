import { MAX_DRAFT_COUNT } from "./content";

export const ERROR_DEFAULT_TITLE = "Uh oh! Something went wrong.";
export const ERROR_DEFAULT_DESCRIPTION =
  "There was a problem with your request.";

export const answerNoLists = [
  "Think twice! Are you sure?",
  "Wait a moment! Do you want to rethink that?",
  "Are you positive? Give it another thought.",
  "Hold on! Are you absolutely sure?",
  "Double-check! Is this your final choice?",
  "Are you convinced? Think again.",
  "Pause for a second! Sure about that?",
  "Last chance to reconsider! Still saying no?",
  "Really sure? Maybe think it over.",
  "Are you certain? Please reconsider.",
];

export const ERROR_MAX_PROJECTS_REACHED_TITLE = "Max projects reached!";
export const ERROR_MAX_PROJECTS_REACHED_DESCRIPTION = `You can only have ${MAX_DRAFT_COUNT} drafts at a time. Consider removing one to add another.`;
