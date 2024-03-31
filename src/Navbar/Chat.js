import { React, useState } from "react";

function Chat() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("male");
    const [selectedOption, setSelectedOption] = useState("");
    const [about, setAbout] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            contact,
            gender,
            selectedOption,
            about
        );
    };
    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setGender("male");
        setSelectedOption("");
        setAbout("");
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 mx-auto my-5 w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-xl font-semibold text-sky-500 mb-4">We will Contact you!!!</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstname" className="block font-bold text-gray-700">First Name*</label>
                    <input type="text" name="firstname" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="lastname" className="block font-bold text-gray-700">Last Name*</label>
                    <input type="text" name="lastname" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="email" className="block font-bold text-gray-700">Enter Email*</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="tel" className="block font-bold text-gray-700">Contact*</label>
                    <input type="tel" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter Mobile number" required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="gender" className="block font-bold text-gray-700">Gender*</label>
                    <div className="flex items-center space-x-4">
                        <div>
                            <input type="radio" name="gender" value="male" id="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} className="mr-2" />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" value="female" id="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} className="mr-2" />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" value="other" id="other" checked={gender === "other"} onChange={(e) => setGender(e.target.value)} className="mr-2" />
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="about" className="block font-bold text-gray-700">Description</label>
                    <textarea name="about" id="about" cols="10" rows="10" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Describe your concern....." required className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div>
                    <label htmlFor="about" className="block font-bold text-gray-700">Suggestion</label>
                    <textarea name="about" id="about" cols="10" rows="10" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Your suggestions matters....." required className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div className="flex justify-between">
                    <button type="reset" onClick={handleReset} className="bg-sky-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">Reset</button>
                    <button type="submit" className="bg-sky-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Chat;
