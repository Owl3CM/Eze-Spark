import { ProviderExample } from "./examples";
import StoryModle from "./StoryModle";

const { Template, story } = StoryModle(ProviderExample);
export default story;
export const Sample = Template.bind({});
