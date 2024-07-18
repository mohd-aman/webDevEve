

// props -> properties
export default function UserProfile(props){
    console.log(props);
    const {name,age,location} = props;
    // console.log(props.name);
    // props.name = "Dummy" // not allowed, immutable
    // console.log(props.age);
    // console.log(props.location);
    return(
        <div>
            <h2>Name : {name}</h2>
            <p>Age : {age}</p>
            <p>Location : {location}</p>
        </div>
    )
}
