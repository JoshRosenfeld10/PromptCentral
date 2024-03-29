import { PromptType } from "@models/prompt";
import PromptCard from "./PromptCard";

interface Props {
  name: string;
  desc: string;
  data: PromptType[];
  handleEdit: (pos: PromptType) => void;
  handleDelete: (post: PromptType) => void;
}

function Profile({ name, desc, data, handleEdit, handleDelete }: Props) {
  return (
    <div className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name}
          {name !== "My" && "'s"} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id as any}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
