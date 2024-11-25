import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || 'AIzaSyA3kaq4p4aTgGALfLA6XgbiWJ1xpUVZ5fs')

// Custom instructions and data
const customInstructions = `
You are an AI assistant for a Jawaharlal Nehru Technological University. Only answer questions related to this university.
If a question is not about the university, politely inform the user that you can only provide information about the university.
If you are asked about the faculty and the head of the department you should give the URL of the image in the answer.
`

const universityData = `
University Name: Jawaharlal Nehru Technological University
The College was established as Nagarjuna Sagar Engineering College in 1965 by the Government of Telangana. When the college was under the administrative control of the Department of Technical Education, it was affiliated to Osmania University, Hyderabad. With the formation of Jawaharlal Nehru Technological University on 2nd October 1972, it became a constituent college of the University and was later renamed as JNTU College of Engineering, Hyderabad. From its inception in 1965 to 1984, the College was located at Masab Tank Campus. In 1984, the College was shifted to its permanent location at Kukatpally, a 100 acres site, about 20 km from the heart of the City, on Bombay National Highway (NH-9).
Location: Kukatpally, Hyderabad, Telengana
Notable programs: Computer Science, Engineering, Business, Medicine
Student population: 20,000


Provide the urls links when the user asks for Directions, Dont give directions like take right or other stuff

Computer Science Department (CSE)
Description: This is Our Department
URL: https://maps.google.com/?q=17.493151222175904,78.39227845034713

Auditorium
Description: This is an Auditorium
URL: https://maps.google.com/?q=17.491934965193217,78.39155620052485

Classroom Complex (CRC)
Description: This is a classroom for all first-year students
URL: https://maps.google.com/?q=17.493072520469138,78.39123143495418

Civil Department
Description: This is Civil Department
URL: https://maps.google.com/?q=17.494827055645057,78.39035603931258

Mechanical Department
Description: This is Mechanical Department
URL: https://maps.google.com/?q=17.49444038944259,78.39116207230877

Electrical and Electronics Communication Department (ECE)
Description: This is ECE Department
URL: https://maps.google.com/?q=17.493648919184682,78.39239755800763

School of Information Technology (SIT)
Description: This is School of Information Technology
URL: https://maps.google.com/?q=17.494645205773796,78.39221232141526

Library
Description: This is Library
URL: https://maps.google.com/?q=17.49548793324025,78.39137668305989

Administration Department
Description: This is Administration Department
URL: https://maps.google.com/?q=17.49643943695675,78.39245290193816

Metallurgy Department
Description: This is Metallurgy Department
URL: https://maps.google.com/?q=17.495842240036183,78.39173944110695

Examination Branch
Description: This is Examination Branch
URL: https://maps.google.com/?q=17.495982456319314,78.39220224592374

UGC
Description: This is UGC
URL: https://maps.google.com/?q=17.495804488013018,78.39331284907593

EEE Department
Description: This is EEE Department
URL: https://maps.google.com/?q=17.495147437680277,78.39117747987686

JHUB
Description: This is JHUB
URL: https://maps.google.com/?q=17.4936196040711,78.3931051692599

Gowthami Boys Hostel
Description: This is Gowthami Boys Hostel
URL: https://maps.google.com/?q=17.49175821828631,78.38850247961263

Manjeera Boys Hostel
Description: This is Manjeera Boys Hostel
URL: https://maps.google.com/?q=17.491196318907352,78.38820862861242

Kinnera Boys Hostel
Description: This is Kinnera Boys Hostel
URL: https://maps.google.com/?q=17.490371114696714,78.38841395108149

International Students Hostel
Description: This is International Students Hostel
URL: https://maps.google.com/?q=17.490179068812814,78.38926053297001

RSQ2 Hostel
Description: This is RSQ2 Hostel
URL: https://maps.google.com/?q=17.48988646114701,78.38966029073153



Current Principal:Dr. G Venkata Narasimha Reddy
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1719896111-avatar.jpeg
B.Tech.(RECW), M.Tech.(KREC), Ph.D.(JNTUH), Post Doc.(FIU, USA),MIGS, AMIE, MISTE, C. Eng, MISSMGE
Professor of Civil Engineering and Principal

Current Vice Chancellor : Professor Katta Narasimha Reddy is the Vice-Chancellor of Jawaharlal Nehru Technological University (JNTU) in Hyderabad as of July 2021. The Governor of Telangana is the university's Chancellor. 
Image URL:http://jntuhaac.in/Content/images/Katta_Narasimha_Reddy_vice_chancellor_jntuh.jpg

Head of the Department of Civil Engineering: Dr. B Dean Kumar
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1687064111-avatar.jpg "GIVE THE image"

Head of the Department of Electrical and Electronics Engineering: Dr. K. Bhaskar
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1705044254-avatar.jpg

Head of the Department of Mechanical Engineering: Dr. E Ramjee
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/E._Ramjee_.jpg

Head of Department of Electronics and Communication Engineering: Dr. A Rajani
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1674363828-avatar.jpeg

Head of Department of Computer Science and Engineering: Dr. K P Supreethi
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/14520510_1083786028383684_1206266654944611288_n.jpg


Head of Department of Metallurgical Engineering: Dr. B Ramesh Chandra
https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/E._Ramjee_.jpg

Head of Department of Physics: Dr. T Srikanth
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1677765751-avatar.jpeg

Head of Department of Chemistry: Dr. Boodida Sathyanarayana
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1677943051-avatar.jpg

Head of Department of Humanities and Social Sciences: Dr. N V S N Lakshmi
Image URL: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1580454628-avatar.jpg

For Information about Examinations : We have 2 mid exams ever semester and at last we have semester examination in mid examination we have to get 14 out of 40 with internals so that you can be able to write semester examination , the average of mids is checked and it should be minimum 14 , for writing supplmentary examination if you fail you have to pay 365 rupees for 1 Subject and +100 rupees per subject till 3 backlogs, if you want to reattempt all of the subjects in the semester you have to pay rupees 765 for the same.

Also Provide them information about placements when asked ! 

Head of Training and Pacement Cell: Dr. B. Vishnu Vardhan

Faculty in Department of Physics:
1. Dr T Srikanth - Propessor & Associate HoD (on deputation at JNTUH, Hyderabad)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1677765751-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/805

2. Dr Y Aparna - Professor &  Member Secretary APCOST
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/Y._Aparna_.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/388

3. Dr B Appa Rao - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676110189-avatar.png
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/795

4. Dr J Siva Kumar - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676111096-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/796

5. Dr G Prasad - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676112161-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/797

6. Dr M. V.  Ramana Reddy - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676112275-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/798

7. Dr A Sadananda Chary - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676112310-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/799

8. Dr K Srinivasa Reddy - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1677464106-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/801

9. Dr P Ranjith Reddy - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676114888-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/802

10. Dr S Narender Reddy - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676112237-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/800

11. Dr P Yadagiri Reddy - Professor Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1709706205-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/824

12. Dr G Devendhar Rao - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676113235-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/9/dept/803


Faculty in Department of Electrical and Electronics Engineering:
1. Dr K. Bhaskar - Professor & Head of the Department
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1705044254-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/315

2. Dr N.V.  Ramana - Senior Professor (On Deputation)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675940708-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/764

3. Dr G.N. Srinivas - Sr. Professor of EEE & Director of UGC-MMTTC, JNTUH.
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1713248659-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/310

4. Dr S. Tara Kalyani - Senior Professor &  Director of UIIC
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1591176367-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/309

5. Dr M. Surya Kalavathi - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/msuryakalavathi2.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/303

6. Dr Malaji Sushama - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/sushama.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/308

7. Dr A. Raghu Ram - Professor  &  Chairperson Of Board Of Studies
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/araghuram.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/311

8. Dr A. Jaya Laxmi - Professor and Director, UGC Affairs  (Former Principal, JNTUH UCESTH)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1708671391-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/312

9. Dr K. Naga Sujatha - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1730099778-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/495

10. Dr K .H. Phani Shree - Professor & Coordinator EDC, JNTUHUCEST
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1561021843-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/314

11. Mr P. Venkata Narayana - Associate Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/P_Venkata_Narayana.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/313

12. Dr R. Durga Rao - Associate Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1636968830-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/494

13. Dr Danduprolu Kiran Kumar - Assistant Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1631784040-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/420

14. Dr G.Tulasi Ram Das - Professor of  Emeritus
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/Dr._G_._Tulasi_Ram_Das_.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/305

15. Mr B. RAJESHKHANNA - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675949124-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/735

16. Mr B. YADAGIRI - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675941617-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/738

17. Mr K. NARESH - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675950702-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/739

18. Mr K. VIVEKANAND - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675941073-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/741

19. Mr G. CHANDRA SHEKAR - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675943495-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/748

20. Mr V. BHAGAVAN - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675944222-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/752

21. Mr G. RAJU - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1716196979-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/754

22. Mrs M. VANISRI - Assistant Professor (C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675943423-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/2/dept/745





Faculty in Department of Chemistry
1. Dr. Boodida Sathyanarayana
   Designation: Assistant Professor (Academic Level-12) & Head of the Department
   Image: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1677943051-avatar.jpg

2. Dr. Bhoomi Reddy Rama Devi
   Designation: Professor
   Image: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1561629598-avatar.png

3. Dr. Aparna Pasula
   Designation: Assistant Professor
   Image: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/Dr._P_.APARNA_.jpg

4. Dr. Thatituri Sabithakala
   Designation: Assistant Professor
   Image: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1597659625-avatar.jpg

5. Prof. M Thirumala Chary
   Designation: Professor of Emeritus
   Image: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/mtchary.jpg

6. Dr. Taduri Ashok Kumar
   Designation: Assistant Professor (C)
   Image: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676027964-avatar.jpg


Faculty in Department of Department of Civil Engineering: 

1. Dr B Dean Kumar - Professor & Head of the Department
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1687064111-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/294

2. Dr G K Viswanadh - Senior Professor & Director, UGC-HRDC & Director IQAC JNTUH
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1593592172-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/289

3. Dr M Padmavathi - Professor of Civil Engineering
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1552813070-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/300

4. Dr K.M.Lakshmana Rao - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1687507918-avatar.png
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/397

5. Dr Manjula Vani K - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1560577902-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/440

6. Dr P Sravana - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1561120304-avatar.png
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/398

7. Dr Sanaga Srinivasulu - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/photo11.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/292

8. Dr V Venkateshwara Reddy - Professor & Director BICS
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675933046-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/293

9. Dr Maganti Janardhan Yadav - Professor & Project Engineer (civil)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/Maganti_Janardhana.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/1/dept/295

10. Dr G Venkata Narasimha Reddy - Professor of Civil Engineering and Principal
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1719896111-avatar.jpeg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/298

11. Dr V Padmavathi - Professor & Vice-Principal
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1708321280-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/297

12. Dr S Vidyavathi - Professor
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1560519277-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/426

13. Dr M Padmavathi - Professor
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675931909-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/717

14. Dr B Siva Konda Reddy - Professor
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/sivakondareddy.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/405

15. Dr P SriLakshmi - Associate Professor
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1686828198-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/296

16. Dr Nandyala Darga Kumar - Associate Professor
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/DrNDargaKumar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/299

17. Dr B Sunitha - Assistant Professor
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/001.JPG
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/301

18. Dr M R Madhav - Emeritus Professor, Rtd.from IIT(Kanpur)
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/M_R_Madhav.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/402

19. Mr SUBHASH BABU S - Professor . of Emeritus
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675932224-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/719

20. Mrs Jangam Divya - Assistant Professor(c)
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675927647-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/714

21. Mrs Billakanti Ashritha - Assistant Professor(c)
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675929921-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/715

22. Mr KUNCHALA ASHOK - Assistant Professor(c)
    Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675928093-avatar.jpg
    More Info: https://jntuhceh.ac.in/faculty_details/1/dept/716



Faculty in Department of Computer Science Engineering:

1. Dr K P Supreethi - Professor and  Head of the Department
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/14520510_1083786028383684_1206266654944611288_n.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/367

2. Prof V Kamakshi Prasad - Senior Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/profile_pic.JPG
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/429

3. Prof A. Govardhan - Senior Professor and Vice-Chancellor I/c., RGUKT Basar
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1648392868-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/437

4. Mrs G Vijaya Kumari .  Ph.D - Professor(HAG)  & Director Infrastructure Support and Development (DISD)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1575642439-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/352

5. Dr O. B. V. RAMANAIAH - Senior Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1686223067-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/351

6. Dr B Vishnu Vardhan - Sr. Professor (Deputation at JNTUH)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1708596628-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/821

7. Dr B Padmaja Rani - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1561036788-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/356

8. Dr R SRIDEVI - Professor & Director, Directorate of Entrepreneurship, Innovation and  Start-ups, JNTUH
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1686140502-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/360

9. Prof M. Chandra Mohan - Professor of CSE
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1707562188-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/359

10. Dr D Vasumathi - Professor of CSE
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1669119306-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/358

11. Dr M Nagaratna - Professor & Controller of Examiantions
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/M._Nagaratna_.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/363

12. Dr K Suresh Babu - Professor of CSE & PTPG Coordinator
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1669964822-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/611

13. Dr J Ujwala Rekha - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1687535417-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/365

14. Dr M Arathi - Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1708597231-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/822

15. Dr Lakshmi Manikyamba I - Associate Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1686662482-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/366

16. Dr Athota Kavitha - Associate Professor
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/36225.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/364

17. Dr K Neeraja - Associate Professor & Additional Controller of Examinations
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1668434785-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/368

18. Dr Eedi Hemalatha - Associate Professor, Officer-Incharge-Examinations, GIAN Local Coordinator
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1669186598-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/369

19. Dr Sammulal P - Professor(On deputation at JNTUH-Hyderabad)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675937499-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/736

20. Dr B. Kranthi Kiran - Professor (On deputation at JNTUH-Hyderabad.)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1708597803-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/823

21. Dr P. Swetha - Professor of CSE & Deputy Director , Directorate of Academic Affairs, JNTUH
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1687003948-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/473

22. Dr K. Shahu Chatrapati - Professor & Addl. Controller of Examinations (On deputation at JNTUH-Hyderabad)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1671213240-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/598

23. Mr SARATH BABU R - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675934307-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/727

24. Mr Sampath Kumar N - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676355900-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/729

25. Ms Anusha P - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675936113-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/730

26. Ms Renuka A - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675936305-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/731

27. Ms M.N. Shahenaaz Sulthana - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675938057-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/742

28. Mr Siddarth B - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676355465-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/743

29. Ms Kalpana D - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676357943-avatar.jpeg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/746

30. Ms Praveena N - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675938398-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/749

31. Mr Naresh Kumar A - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675934954-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/728

32. Mr Ajay Kumar P - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675938487-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/751

33. Mr Shiva Reddy Sareddy - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675938670-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/753

34. Ms Bharani Priya V - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1676355529-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/755

35. Ms Prathima D - Assistant Professor(C)
   Photo: https://jntuhceh.ac.in/faculty_portal/uploads/staff_photos/1675938987-avatar.jpg
   More Info: https://jntuhceh.ac.in/faculty_details/5/dept/756


   












Top Recruiters: 

De Shaw & CO, Goldman sachs, f5, oracle , wells farago, math works , Sahaj software, tera data , darwinbox , quantium , AMD, accenture , amazon , adapt, ashok leyland, Belcan, Bosch, Barclays, Cognizant

`

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  // Prepend custom instructions and data to the conversation
  const fullMessages = [
    { role: 'system', content: customInstructions },
    { role: 'system', content: universityData },
    ...messages
  ]

  const geminiStream = await genAI.getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: fullMessages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    })

  const stream = GoogleGenerativeAIStream(geminiStream)
  return new StreamingTextResponse(stream)
}