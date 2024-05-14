import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";


export const Stories = () => {

    const { currentUser } = useContext(AuthContext);

    //TEMPORARY
  const stories = [
        {
            id: 1,
            name: "Johnston Delaney",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 2,
            name: "John Stones",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 3,
            name: "James Frank",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 4,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ];


    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.profilePic} alt=""/>
                <span>{currentUser.username}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt=""/>
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
};