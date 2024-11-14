interface CallDetails {
    name: string;
    number: string;
    call_time: string;
    duration: string;
    transcript: string;
    recording: string;
    overall_response: string;
}

const data: CallDetails[] = [
    {
        name: "Rahul Sharma",
        number: "+91 9123456780",
        call_time: "2024-11-14 10:30 AM",
        duration: "00:57",
        transcript: "https://res.cloudinary.com/dksnirztn/raw/upload/v1731579716/vcs-speak/dz7sas6frzejrohhc1wt.txt",
        recording: "https://res.cloudinary.com/dksnirztn/video/upload/v1731579724/vcs-speak/z7imgzqx1x4iqnnxusxz.wav",
        overall_response: "Positive"
    },
    {
        name: "Priya Singh",
        number: "+91 9123456781",
        call_time: "2024-11-14 11:00 AM",
        duration: "00:48",
        transcript: "https://res.cloudinary.com/dksnirztn/raw/upload/v1731579781/vcs-speak/icosmjdggxktupaohzjt.txt",
        recording: "https://res.cloudinary.com/dksnirztn/video/upload/v1731579782/vcs-speak/ynmx1kiwtzipg0tzl4dw.wav",
        overall_response: "Neutral"
    },
    {
        name: "Amit Kumar",
        number: "+91 9123456782",
        call_time: "2024-11-14 11:30 AM",
        duration: "01:52",
        transcript: "https://res.cloudinary.com/dksnirztn/raw/upload/v1731579828/vcs-speak/akivx7nfways22t057yl.txt",
        recording: "https://res.cloudinary.com/dksnirztn/video/upload/v1731579839/vcs-speak/dskhidgi1dieehtzmpfn.wav",
        overall_response: "Negative"
    },
    {
        name: "Sneha Verma",
        number: "+91 9123456783",
        call_time: "2024-11-14 12:00 PM",
        duration: "00:46",
        transcript: "https://res.cloudinary.com/dksnirztn/raw/upload/v1731579578/vcs-speak/i0tehwctu1trhm4v8tzt.txt",
        recording: "https://res.cloudinary.com/dksnirztn/video/upload/v1731579578/vcs-speak/m1feioqm1sltktceiggm.wav",
        overall_response: "Positive"
    },
    {
        name: "Rakesh Yadav",
        number: "+91 9123456784",
        call_time: "2024-11-14 12:30 PM",
        duration: "00:49",
        transcript: "https://res.cloudinary.com/dksnirztn/raw/upload/v1731579873/vcs-speak/emqsmwpwzxwecosqtm2d.txt",
        recording: "https://res.cloudinary.com/dksnirztn/video/upload/v1731579874/vcs-speak/wn11dcjegkqgwdpka5l9.wav",
        overall_response: "Neutral"
    }
];

export default data;