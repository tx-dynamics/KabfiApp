import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
// import { WebView } from 'react-native-webview';

const PrivacyPolicy = (props) => {
    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                <Text style={styles.heading}>1.	Introduction</Text>
                <Text style={styles.content}>
                    When you use Kabfi, you trust us with your personal data. {'\n'}{'\n'}
                    This policy describes the personal data we collect, how it’s used and shared, and your choices regarding this data. {'\n'}{'\n'}
                    Last modified: May 1, 2021
                </Text>  

                <Text style={styles.bigHeading}>2. Overview</Text>
                
                <Text style={styles.heading}>A. Scope</Text>
                <Text style={styles.content}>
                    This notice applies to users of Kabfi’s services anywhere in the world, including users of Kabfi’s apps, websites, features, or other services.{'\n'}{'\n'}
                    This notice describes how Kabfi and its affiliates, collect and use personal data. This notice applies to all users of our apps, websites, features or other services anywhere in the world. {'\n'}{'\n'}
                    This notice also governs Kabfi’s other collections of personal data in connection with Kabfi’s services. We may collect the personal data of those who start but do not complete applications. {'\n'}{'\n'}
                    Our data practices are subject to applicable laws in the places in which we operate. This means that we engage in the practices described in this notice in a particular country or region only if permitted under the laws of those places. Please contact us at info@kabfi.com  with any questions regarding our practices in a particular country or region.{'\n'}{'\n'}
                </Text>

                <Text style={styles.heading}>B. Data controller and transfer</Text>
                <Text style={styles.content}>
                    Kabfi Limited (381A Bradford Road, Gomersal, Cleckheaton, BD19 4BQ, UK) is the data controller for the personal data collected in connection with use of Kabfi’s services anywhere in the world.{'\n'}{'\n'}
                    Kabfi operates and processes data globally. We may also transfer data to countries other than those where our users live or use Kabfi’s services. We do so in order to fulfil our agreements with users, such as our Terms of Use, or based on users’ prior consent, adequacy decisions for the relevant countries, or other transfer mechanisms as may be available under applicable law, such as the Standard Contractual Clauses.{'\n'}{'\n'}
                    Questions, comments, and complaints about Kabfi’s data practices can be submitted via <Text style={styles.link}>info@kabfi.com</Text>.{'\n'}{'\n'}
                </Text>

                <Text style={styles.bigHeading}>3.	Data collection and uses</Text>
                
                <Text style={styles.heading}>A. The data we collect</Text>
                <Text style={styles.content}>
                    Kabfi collects:{'\n'}{'\n'}
                    •	Data provided by users to Kabfi, such as during account creation {'\n'}
                    •	Data created during the use of our services, such as location, app usage and device data{'\n'}
                    •	Data from other sources, such as Kabfi partners and third parties that use Kabfi’s APIs{'\n'}{'\n'}
                    The following data is collected by or on behalf of Kabfi:{'\n'}{'\n'}
                    1.	Data provided by users. This includes:{'\n'}{'\n'}
                    •	User profile: We collect data when users create or update their Kabfi accounts. This may include their name, email address, phone number, login name and password, address, profile picture, payment or banking information (including related payment verification information), driving licence and other identification documents (which may indicate document numbers as well as date of birth, gender and user settings.{'\n'}
                    •	We may use the photos submitted by users to verify their identities, such as through facial recognition technologies. For more information, please see the section titled “How we use personal data”.{'\n'}
                    •	Background checks and identity verification: We collect background check and identity verification information. This may include information such as user history or criminal record (where permitted by law), and right to work. This information may be collected by an authorised vendor on Kabfi’s behalf. {'\n'}
                    •	Demographic data: We may collect demographic data about users, including through user surveys. In some countries, we may also receive demographic data about users from third parties.{'\n'}
                    •	User content: We collect the information that users submit when they contact Kabfi customer support and provide ratings to the service. This may include feedback, photographs or other recordings collected by users.{'\n'}{'\n'}
                    2.	Data created during use of our services. This includes:{'\n'}{'\n'}
                    •	Location data: Kabfi collects this data when the app is installed on the mobile device, running in the foreground (app open and onscreen) or background (app open but not onscreen) of their mobile device.{'\n'}
                    We use this data to enhance your use of our apps, including to improve pick-up locations, enable safety features, and prevent and detect fraud.{'\n'}
                    •	Usage data: We collect data about how users interact with our services. This includes data such as access dates and times, app features or pages viewed, app crashes and other system activity, type of browser, and third-party sites or services used before interacting with our services. In some cases, we collect this data through cookies, pixels, tags and similar tracking technologies that create and maintain unique identifiers. {'\n'}
                    •	Device data: We may collect data about the devices used to access our services, including the hardware models, device IP address, operating systems and versions, software, preferred languages, unique device identifiers, advertising identifiers, serial numbers, device motion data and mobile network data.{'\n'}
                    •	Communications data: We enable users to communicate with each other and Kabfi through Kabfi’s mobile apps and websites. For example, we enable users, to call, text, or send other files to each other (generally without disclosing their telephone numbers to each other). To provide this service, Kabfi receives some data regarding the calls, texts or other communications, including the date and time of the communications and the content of the communications. Kabfi may also use this data for customer support services (including to resolve disputes between users), for safety and security purposes, to improve our products and services, and for analytics.{'\n'}{'\n'}
                    3.	Data from other sources. This includes:{'\n'}{'\n'}
                    •	User feedback, such as ratings, feedback and compliments.{'\n'}
                    •	Users participating in our referral programmes. For example, when a user refers another person, we receive the referred person’s personal data from that user.{'\n'}
                    •	Kabfi account owners who request services for or on behalf of other users, or who enable such users to request or receive services through their accounts. {'\n'}
                    •	Users or others providing information in connection with claims or disputes.{'\n'}
                    •	Kabfi business partners through which users create or access their Kabfi account, such as payment providers, social media services, or apps or websites that use Kabfi’s APIs or whose APIs Kabfi uses.{'\n'}
                    •	Vendors who help us verify users’ identities, background information and eligibility to work, for regulatory, safety and security purposes.{'\n'}
                    •	Insurance, vehicle, or financial services providers for drivers and/or couriers.{'\n'}
                    •	Partner transportation companies (for drivers or couriers who use our services through an account associated with such a company).{'\n'}
                    •	Publicly available sources.{'\n'}
                    •	Marketing service providers.{'\n'}

                    Kabfi may combine the data collected from these sources with other data in its possession.
                </Text>

                <Text style={styles.heading}>B. How we use personal data</Text>
                <Text style={styles.content}>
                    Kabfi collects and uses data to enable reliable operations for its services. We also use the data we collect:{'\n'}{'\n'}
                    •	To enhance the safety and security of our users and services{'\n'}
                    •	For customer support{'\n'}
                    •	For research and development{'\n'}
                    •	To enable communication between users{'\n'}
                    •	To send marketing and non-marketing communications to users{'\n'}
                    •	In connection with legal proceedings{'\n'}{'\n'}

                    Kabfi does not sell or share user personal data with third parties for their direct marketing, except with users’ consent.{'\n'}{'\n'}
                    Kabfi uses the data it collects for purposes including:{'\n'}
                    1.	Providing services and features. Kabfi uses the data we collect to provide, personalise, maintain and improve our products and services.{'\n'}
                    This includes using the data to:{'\n'}{'\n'}
                    •	Create and update users’ accounts.{'\n'}
                    •	Verify users eligibility to enroll.{'\n'}
                    •	Enable features that allow users to share information with other people, refer a friend to Kabfi.{'\n'}
                    •	Enable features to personalise users’ Kabfi accounts, such as creating bookmarks for favourite places, and to enable quick access to previous destinations. We may, for example, present a Kabfi user with personalised advertisements based on their interests. Please see the section of this notice titled “Choice and transparency” to learn how to object to this use of personal data.{'\n'}
                    •	Perform internal operations necessary to provide our services, including to troubleshoot software bugs and operational problems, to conduct data analysis, testing and research, and to monitor and analyse usage and activity trends.{'\n'}{'\n'}
                    2.	Safety and security. We use personal data to help maintain the safety, security and integrity of our services and users. This includes:{'\n'}
                    •	Screening users before enabling their use of our services and at subsequent intervals, including through reviews of background checks, where permitted by law, to help prevent use of our services .{'\n'}
                    •	In certain regions, using information derived from driving licence photos, and other photos submitted to Kabfi, This  may include Kabfi’s real-time ID check feature, which prompts the user to share a selfie before going online to help ensure that the user using the app matches the Kabfi account we have on file. This also includes comparing photographs that we have on file against photographs (i) of other users to prevent identity-borrowing, and (ii) from public databases to verify user identity.{'\n'}
                    •	Using device, location, profile, usage and other data to prevent, detect and combat fraud or unsafe activities.{'\n'}
                    Using user ratings and feedback to encourage compliance with our Community Guidelines and as grounds for deactivating users with misleading information or who otherwise violated such guidelines in certain countries.{'\n'}
                    3.	Customer support. Kabfi uses the information we collect (including recordings of customer support calls with notice to and the consent of the user) to provide customer support, including to:{'\n'}
                    •	Direct questions to the appropriate customer support person{'\n'}
                    •	Investigate and address user concerns{'\n'}
                    •	Monitor and improve our customer support responses and processes{'\n'}{'\n'}

                    4.	Research and development. We may use the data we collect for testing, research, analysis, product development and machine learning to improve the user experience.{'\n'}
                    This helps us improve and enhance the safety and security of our services, improve our ability to prevent the use of our services for illegal or improper purposes, develop new features and products, and facilitate insurance and finance solutions in connection with our services.{'\n'}
                    5.	Enabling communications between users. {'\n'}{'\n'}

                    6.	Marketing. Kabfi may use the data we collect to market our services to our users. This includes sending users communications about Kabfi services, features, studies, surveys, news, updates and events.{'\n'}
                    We may also send communications to our users about products and services offered by Kabfi partners. {'\n'}
                    We may use the data we collect to personalise the marketing communications (including advertisements) that we send, including based on user location, past use of Kabfi’s services, and user preferences and settings.{'\n'}
                    We may also send users communications regarding elections, ballots, referenda, and other political and notice processes that relate to our services.{'\n'}
                    7.	Non-marketing communications. Kabfi may use the data we collect to generate and provide users with receipts, inform them of changes to our terms, services, or policies, or send other communications that aren’t for the purpose of marketing the services or products of Kabfi or its partners.{'\n'}{'\n'}

                    8.	Legal proceedings and requirements. We may use the personal data we collect to investigate or address claims or disputes relating to the use of Kabfi’s services, or as otherwise allowed by applicable law, or as requested by regulators, government entities and official enquiries.{'\n'}{'\n'}

                    9.	Automated decision-making{'\n'}
                    We use personal data to make automated decisions relating to the use of our services. This includes:{'\n'}
                    •	Matching available demand to predicted supply. Users can be matched based on  proximity and other factors. {'\n'}
                    •	Determining user ratings, and deactivating users with low ratings. {'\n'}
                    •	Deactivating users who are identified as having engaged in fraud or activities that may otherwise harm Kabfi, its users or others. {'\n'}
                    In order to learn more information about these processes please contact Kabfi customer support info@kabfi.com.{'\n'}
                </Text>

                <Text style={styles.heading}>C. Cookies and third-party technologies</Text>
                <Text style={styles.content}>
                    Kabfi and its partners use cookies and other identification technologies in our apps, websites, emails and online ads for purposes described in this notice.{'\n'}
                    Cookies are small text files that are stored on browsers or devices by websites, apps, online media and advertisements. Kabfi uses cookies and similar technologies for purposes such as:{'\n'}
                    •	Authenticating users{'\n'}
                    •	Remembering user preferences and settings{'\n'}
                    •	Determining the popularity of content{'\n'}
                    •	Delivering and measuring the effectiveness of advertising campaigns{'\n'}
                    •	Analysing site traffic and trends, and generally understanding the online behaviour and interests of people who interact with our services{'\n'}{'\n'}
                    We may also allow others to provide audience measurement and analytics services for us, to serve advertisements on our behalf across the Internet, and to track and report on the performance of those advertisements. These entities may use cookies, web beacons, SDKs and other technologies to identify the devices used by visitors to our websites, as well as when they visit other online sites and services.{'\n'}
                </Text>

                <Text style={styles.heading}>D. Data sharing and disclosure</Text>
                <Text style={styles.content}>
                    Some of Kabfi’s products, services and features require that we share data with other users or at a user’s request. We may also share data with our affiliates, subsidiaries and partners for legal reasons or in connection with claims or disputes.{'\n'}
                    Kabfi may share the data we collect:{'\n'}{'\n'}
                    1.	With other users{'\n'}
                    This includes sharing:{'\n'}
                    •	Name, Rating {'\n'}
                    Including photo; vehicle make, model, colour, number plate and vehicle photo; location average rating provided by users; total number of comments; length of use of the Kabfi app; contact information (depending upon applicable laws); and compliments and other feedback submitted by past users.{'\n'}{'\n'}
                    2.	 At the user’s request{'\n'}
                    This includes sharing data with:{'\n'}
                    •	Other people at the user’s request.{'\n'} 
                    •	Kabfi business partners. For example, if a user requests a service through a partnership or promotional offering made by a third party, Kabfi may share certain data with that third party. This may include, for example, other services, platforms, apps or websites that integrate with our APIs, vehicle suppliers or services, those with an API or service with which we integrate or other Kabfi business partners and their users in connection with promotions, competitions or specialised services.{'\n'}{'\n'}
                    3.	 With the general public{'\n'}
                    •	Questions or comments from users submitted through public forums such as Kabfi blogs and Kabfi social media pages may be viewable by the public, including any personal data included in the questions or comments submitted by a user.{'\n'}{'\n'}

                    4.	With the Kabfi account owner{'\n'}

                    •	If a user requests transport or places an order using an account owned by another party, we may share real-time location data, with the owner of that account. {'\n'}{'\n'}

                    5.	With Kabfi service providers and business partners{'\n'}
                    Kabfi provides data to vendors, consultants, marketing partners, research firms and other service providers or business partners. These include:{'\n'}
                    •	Background check and identity verification providers {'\n'}
                    •	Apple or Google, in connection with the use of their Maps in Kabfi’s apps (see Apple/Google’s Privacy Policy for information about their collection and use of data){'\n'}
                    •	Facebook, in connection with the use of the Facebook business tools in Kabfi’s apps and websites (see Facebook’s Privacy Policy for information about their collection and use of data){'\n'}
                    •	Marketing partners and marketing platform providers, including social media advertising services{'\n'}
                    •	Data analytics providers{'\n'}
                    •	Research partners, including those performing surveys or research projects on Kabfi’s behalf{'\n'}
                    •	Vendors that assist Kabfi to enhance the safety and security of its apps{'\n'}
                    •	Consultants, lawyers, accountants, and other professional service providers{'\n'}
                    •	Fleet partners{'\n'}
                    •	Insurance and financing partners{'\n'}
                    •	Airports{'\n'}
                    Vehicle solution vendors or third-party vehicle suppliers{'\n'}{'\n'}
                    6.	For legal reasons or in the event of a dispute{'\n'}
                    Kabfi may share users’ personal data if we believe that it’s required by applicable law, regulation, operating licence or agreement, legal process or governmental request, or where the disclosure is otherwise appropriate due to safety or similar concerns.{'\n'}
                    This includes sharing personal data with law enforcement officials, public health officials, other government authorities, airports (if required by the airport authorities as a condition of operating on airport property) or other third parties as necessary to enforce our, user agreements or other policies, to protect Kabfi’s rights or property or the rights, safety or property of others, or in the event of a claim or dispute relating to the use of our services.{'\n'}
                    This also includes sharing personal data with others in connection with, or during negotiations of, any merger, sale of company assets, consolidation or restructuring, financing or acquisition of all or a portion of our business by or into another company.{'\n'}{'\n'}
                    7.	With consent{'\n'}
                    Kabfi may share a user’s personal data other than as described in this notice if we notify the user and they consent to the sharing.{'\n'}

                </Text>

                <Text style={styles.heading}>E. Data retention and deletion</Text>
                <Text style={styles.content}>
                    Kabfi retains user data for as long as necessary for the purposes described above.{'\n'}
                    Users can request deletion of their accounts at any time. Kabfi can retain user data after a deletion request due to legal or regulatory requirements or for the reasons stated in this policy.{'\n'}
                    Kabfi retains user data for as long as necessary for the purposes described above. This means that we retain different categories of data for different periods of time depending on the category of user to whom the data relates, the type of data and the purposes for which we collected the data.{'\n'}
                    Users may request deletion of their account at any time by emailing info@kabfi.com. Following an account deletion request, Kabfi deletes the user’s account and data, unless they must be retained for legal or regulatory requirements, for purposes of safety, security and fraud prevention, or because of an issue relating to the user’s account such as an unresolved claim or dispute. {'\n'}
                </Text>    


                <Text style={styles.heading}>F. Grounds for processing</Text>
                <Text style={styles.content}>
                    We only collect and use personal data where we have lawful grounds to do so. These include processing users’ personal data to provide requested services and features, for purposes of Kabfi’s legitimate interests or those of other parties, to fulfil our legal obligations, or based on consent.{'\n'}
                    We collect and use personal data only where we have one or more lawful grounds for doing so. Such grounds may vary depending on where our users are located, but generally include the processing of personal data:{'\n'}{'\n'}
                    1.	To provide requested services and features{'\n'}
                    In order to provide our services, we must collect and use certain personal data. This includes:{'\n'}
                    •	User profile data, which we use to establish and maintain user accounts, verify user identity, and communicate with users {'\n'}
                    •	User location data{'\n'}
                    •	Usage data, which is necessary to maintain, optimise and enhance Kabfi’s services, including to determine promotions {'\n'}
                    •	Information relating to customer support{'\n'}{'\n'}
                    2.	For purposes of the legitimate interests of Kabfi or other parties{'\n'}
                    This includes using personal data to maintain and enhance our users’ safety and security. For example, we use personal data to prevent use of our services by users who have engaged in inappropriate behaviour, such as by retaining data of banned users to prevent their use of Kabfi’s apps. {'\n'}
                    This also includes purposes such as combating fraud, improving our services, direct marketing, research, and development, and enforcing Kabfi’s Terms of Service.{'\n'}

                    In addition, it includes using personal data to the extent necessary for the interests of other people or the general public, such as in connection with legal or insurance claims, and to protect the rights and safety of others.{'\n'}{'\n'}
                    3.	To fulfil Kabfi legal obligations{'\n'}
                    For example, Kabfi is subject to laws and regulations in many cities and countries that require it to collect and retain data about our users, and to provide copies of such data to the government or other authorities. We collect and use personal data to comply with such laws.{'\n'}
                    Kabfi may also share data with law enforcement regarding criminal acts or threats to public safety, or requests by third parties pursuant to legal processes. {'\n'}{'\n'}
                    4.	With consent{'\n'}
                    Kabfi may collect and use personal data based on the user’s consent. For example, we may collect personal data through voluntary surveys. Responses to such surveys are collected on the basis of consent and will be deleted when no longer necessary for the purposes collected.{'\n'}

                    A user who has provided consent to collection or use of their personal data can revoke it at any time. However, the user will not be able to use any service or feature that requires collection or use of that personal data.{'\n'}
                </Text>    
                

                <Text style={styles.bigHeading}>4.	Choice and transparency</Text>
                <Text style={styles.content}>
                    Kabfi enables users to access and control the data that Kabfi collects, including through:{'\n'}
                    •	In-app settings{'\n'}
                    •	Device permissions{'\n'}
                    •	In-app ratings pages{'\n'}
                    •	Marketing opt-outs{'\n'}{'\n'}

                    Kabfi also enables users to request access to or copies of their data, changes or updates to their accounts, deletion of their accounts.{'\n'}{'\n'}

                    A.	Privacy settings{'\n'}
                    Settings menus in the Kabfi app for riders give them the ability to set or update their location sharing preferences and their preferences for receiving mobile notifications from Kabfi. Information about these settings, how to set or change these settings, and the effect of turning off these settings is described below.{'\n'}
                    •	Location data{'\n'}
                    Kabfi uses the users device to helps improve its services.{'\n'}
                    Notifications: Account and newsfeed updates{'\n'}
                    Kabfi provides users with notifications and updates relating to activity on the application. These notifications are a necessary part of using the Kabfi app.{'\n'}
                    •	Notifications: discounts and news{'\n'}
                    Users can enable Kabfi to send push notifications about discounts and news from Kabfi. {'\n'}{'\n'}
                    B.	Device permissions{'\n'}
                    Most mobile device platforms (iOS, Android, etc.) have defined certain types of device data that apps cannot access without the device owner’s permission, and these platforms have different methods for how that permission can be obtained. iOS devices notify users the first time the Kabfi app requests permission to access certain types of data and gives users the option to grant or refuse permission. Android devices notify users of the permissions that the Kabfi app seeks before their first use of the app, and use of the app constitutes a granting of such permission.{'\n'}{'\n'}
                    C.	Ratings look-up{'\n'}
                    Users are able to rate each other on a scale of 1 to 5. An average of those ratings is associated with a user’s account and is displayed to other users to whom they provide services or from whom they receive services. {'\n'}
                    This two-way system holds everyone accountable for their behaviour. Accountability helps create a respectful, safe environment for drivers and riders.{'\n'}
                    Users can see their average rating in the Kabfi app.{'\n'}{'\n'}
                    D.	Marketing opt-outs{'\n'}
                    Users can opt out of receiving promotional emails and other messages from Kabfi by emailing info@kabfi.com. We may still send users who have opted out non-promotional communications about information on their account.{'\n'}{'\n'}
                    E.	User data requests{'\n'}
                    Kabfi provides users with a variety of ways to learn about, control, and submit questions and comments about Kabfi’s handling of their data. To make a request, contact info@kabfi.com{'\n'}

                </Text>    


                <Text style={styles.heading}>5.	Updates to this notice</Text>
                <Text style={styles.content}>
                We may occasionally update this notice. If we make significant changes, we will notify users in advance of the changes through the Kabfi apps or through other means, such as email. We encourage users to periodically review this notice for the latest information on our privacy practices.{'\n'}
                </Text>    


            </View>  
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    contentArea:{
        width:'100%',
        height:'100%',
        padding:10        
    },
    heading:{
        fontSize:15,
        fontWeight:'bold',
        marginVertical:10
    },
    bigHeading:{
        marginVertical:10,
        fontWeight:'bold',
        fontSize:18
    },
    content:{
        fontSize:14,
        textAlign:'justify',
        lineHeight:17
    },
    link:{
        color:'blue',
        textDecorationLine:'underline'
    }
});
export default PrivacyPolicy;