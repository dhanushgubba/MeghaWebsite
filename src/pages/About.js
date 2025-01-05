import React, { useState } from 'react';
import './About.css';
import SrilekhaImage from '../images/srilekha.jpg';
import JanSaidaImage from '../images/jansaida.jpg';
import ShaikAliImage from '../images/shaikali.jpg';
import PravallikaImage from '../images/pravallikaimage.jpg';
import DhanushImage from '../images/mypicture.jpg';
import vigneshImage from '../images/vigneshimage.jpg';
import VasaviImage from '../images/vasaviimage.jpg';
import NaziaImage from '../images/naziaimage.jpg';
import AfreenImage from '../images/afreenimage.jpg';
import NehaImage from '../images/nehaimage.jpg';
import AyushImage from '../images/ayushimage.jpg';
import DeveshImage from '../images/deveshimage.jpg';
import KrupaImage from '../images/kruparaniimage.jpg';
import CharishmaImage from '../images/charishmaimage.jpg';
import YashwanthImage from '../images/yashwanthimage.jpg';
import Image from '../images/aboutimage.jpg';
import Image1 from '../images/aboutimage1.jpg';
import MahalakshmiImage from '../images/mahalakshmiimage.jpg';
import YasaswiniImage from '../images/yasaswiniimage.jpg';
import BhavishyanthaImage from '../images/bhavishyanthaimage.jpg';
import JahnaviImge from '../images/jahnaviimage.jpg';
import KushalImage from '../images/kushalimage.jpg';
import ZaheerImage from '../images/zaheerimage.jpg';
import SaiKrishnaImage from '../images/saikrishnaimage.jpg';
const About = () => {
    // State to manage visibility of team members under each director
    const [visible, setVisible] = useState({});

    // Function to toggle visibility for a specific director
    const toggleVisibility = (id) => {
        setVisible((prevVisible) => ({
            ...prevVisible,
            [id]: !prevVisible[id],
        }));
    };

    return (
        <div className='about-container'>
            <section className='intro-section'>
                <div className="intro-content">
        <div className="text-container">
            <h1>About Us</h1>
            <p className="about-paragraph">
                Welcome to <strong>Club Megha</strong>, a student-led initiative dedicated to empowering tech enthusiasts with the knowledge and skills needed to thrive in today's ever-evolving technological landscape. Our club focuses on building a collaborative environment where members can share, learn, and grow together in various fields of technology.
            </p>

            <p className="about-paragraph">
                With a special focus on cloud technologies, we provide numerous opportunities for hands-on learning and real-world problem-solving. Whether you're a beginner or an experienced developer, Club Megha is the perfect place to nurture your passion for technology and innovation.
            </p>

            <p className="about-paragraph">
                Our community fosters creativity, collaboration, and innovation by organizing workshops, hackathons, and collaborative projects. We also provide guidance on acquiring industry-recognized certifications to help you stand out in the competitive tech landscape.
            </p>

            <p className="about-paragraph">
                Join us on this exciting journey of learning and innovation, where we strive to push the boundaries of technology, inspire creativity, and prepare the next generation of leaders in the tech world.
            </p>
        </div>

        <div className="images-container">
            <img src={Image} alt="Club Megha 1" className="intro-image" />
            <img src={Image1} alt="Club Megha 2" className="intro-image" />
            <img src={Image1} alt="Club Megha 2" className="intro-image" />
        </div>
    </div>
</section>


            <section className='mission-section'>
                <h1>Our Mission</h1>
                <p>Our mission is to provide a platform for students to learn, experiment, and grow in the field of cloud computing. Through workshops, hands-on projects, and industry collaborations, we aim to foster a deep understanding of cloud technologies such as AWS, GCP, and Azure.</p>
            </section>

            <section className="what-we-do">
                <h2>What We Do</h2>
                <ul>
                    <li>💻 <strong>Workshops:</strong> Regular cloud workshops and bootcamps where members can gain hands-on experience.</li>
                    <li>📜 <strong>Certifications:</strong> Guidance and support for members pursuing cloud certifications like AWS, GCP, and Azure.</li>
                    <li>💡 <strong>Hackathons:</strong> Organizing cloud-focused hackathons to solve real-world problems.</li>
                    <li>🤝 <strong>Collaborative Projects:</strong> Team-based projects applying cloud skills to create impactful solutions.</li>
                </ul>
            </section>

            <section className="team-section">
                <h2>Meet the Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="team-member-photo">
                            <img src={SrilekhaImage} alt="President" />
                        </div>
                        <h3>Appikatla Srilekha</h3>
                        <p>President</p>
                    </div>
                    <div className="team-member">
                        <div className="team-member-photo">
                            <img src={JanSaidaImage} alt="Vice President" />
                        </div>
                        <h3>Jan Saida</h3>
                        <p>Vice President</p>
                    </div>
                </div>

                <br />
                <div className="director-grid">
                    {/* Director 1 */}
                    <div className="team-member director">
                        <div className='team-member-photo'>
                            <img src={PravallikaImage} alt='Technical Director' />
                        </div>
                        <h3 onClick={() => toggleVisibility(1)}>Bopanna Devi Pravallika</h3>
                        <p>Technical Director</p>
                        {visible[1] && (
                            <div className="sub-team">
                                <div className="sub-member">
                                    <img src={ShaikAliImage} alt="Sub Member 1" />
                                    <h4>Ali Shaik</h4>
                                    <p>Role: Technical Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={vigneshImage} alt="Sub Member 2" />
                                    <h4>Poluru Vignesh</h4>
                                    <p>Role: Technical Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={VasaviImage} alt="Sub Member 2" />
                                    <h4>Nadamuni Vasavi</h4>
                                    <p>Role: Technical Member</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <br />
                    <br />
                    {/* Director 2 */}
                    <div className="team-member director">
                        <div className='team-member-photo'>
                            <img src={YasaswiniImage} alt='Event Director' />
                        </div>
                        <h3 onClick={() => toggleVisibility(2)}>Aremanda Yasaswini</h3>
                        <p>Design & Drafting Director</p>
                        {visible[2] && (
                            <div className="sub-team">
                                <div className="sub-member">
                                    <img src={DeveshImage} alt="Sub Member 1" />
                                    <h4>Bellamkonda V A Devesh</h4>
                                    <p>Role: Design & Drafting Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={AyushImage} alt="Sub Member 2" />
                                    <h4>Ayush Kumar</h4>
                                    <p>Role: Design & Drafting Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={NehaImage} alt="Sub Member 2" />
                                    <h4>Neha Avanigadda</h4>
                                    <p>Role: Design & Drafting Member</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="team-member director">
                        <div className='team-member-photo'>
                            <img src={CharishmaImage} alt='Event Director' />
                        </div>
                        <h3 onClick={() => toggleVisibility(3)}>Mulpuru Charishma</h3>
                        <p>Internal & External Director</p>
                        {visible[3] && (
                            <div className="sub-team">
                                <div className="sub-member">
                                    <img src={KrupaImage} alt="Sub Member 1" />
                                    <h4>Dande Krupa Rani</h4>
                                    <p>Role: Internal & External Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={MahalakshmiImage} alt="Sub Member 2" />
                                    <h4>S Mahalakshmi Priyanka</h4>
                                    <p>Role: Internal & External Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={BhavishyanthaImage} alt="Sub Member 2" />
                                    <h4>Dusanapudi Bhavishyanitha</h4>
                                    <p>Role: Internal & External Member</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="team-member director">
                        <div className='team-member-photo'>
                            <img src={KushalImage} alt='Event Director' />
                        </div>
                        <h3 onClick={() => toggleVisibility(4)}>Majji Naga Sai Kushal</h3>
                        <p>Certification & Vouchers Director</p>
                        {visible[4] && (
                            <div className="sub-team">
                                <div className="sub-member">
                                    <img src={ZaheerImage} alt="Sub Member 1" />
                                    <h4>Zaheer Khan</h4>
                                    <p>Role: Certification & Vouchers Member</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="team-member director">
                        <div className='team-member-photo'>
                            <img src={JahnaviImge} alt='Event Director' />
                        </div>
                        <h3 onClick={() => toggleVisibility(5)}>Kurra Jahnavi</h3>
                        <p>Professional Development Chair Director</p>
                        {visible[5] && (
                            <div className="sub-team">
                                <div className="sub-member">
                                    <img src={YashwanthImage} alt="Sub Member 1" />
                                    <h4>Yashwath Kumar Gajula</h4>
                                    <p>Role: PDC Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={SaiKrishnaImage} alt="Sub Member 2" />
                                    <h4>Sai Krishna</h4>
                                    <p>Role: PDC Member</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="team-member director">
                        <div className='team-member-photo'>
                            <img src={DhanushImage} alt='Event Director' />
                        </div>
                        <h3 onClick={() => toggleVisibility(6)}>G V Naga Dhanush</h3>
                        <p>Social Media & PR Director</p>
                        {visible[6] && (
                            <div className="sub-team">
                                <div className="sub-member">
                                    <img src={NaziaImage} alt="Sub Member 1" />
                                    <h4>Uzma Nazia</h4>
                                    <p>Role: Social Media & PR Member</p>
                                </div>
                                <div className="sub-member">
                                    <img src={AfreenImage} alt="Sub Member 2" />
                                    <h4>Shaik Afreen</h4>
                                    <p>Role: Social Media & PR Member</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
