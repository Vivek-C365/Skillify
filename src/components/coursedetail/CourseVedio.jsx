import ReactPlayer from "react-player"

export default function CourseVedio() {
  return (
    <div className="w-full  overflow-hidden rounded-lg shadow-md bg-black">
      <div className="relative pt-[56.25%]"> 
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width="100%"
          height="100%"
          controls={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
          config={{
            youtube: {
              playerVars: { 
                modestbranding: 1,
                rel: 0
              }
            }
          }}
        />
      </div>
    </div>
  )
}
