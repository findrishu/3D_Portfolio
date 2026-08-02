import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { config } from '../config';

interface ContentContextType {
  aboutMe: string;
  skills: string[];
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  aboutMe: config.developer.description,
  skills: config.skills.design.tools, // default fallback
  loading: true
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [aboutMe, setAboutMe] = useState(config.developer.description);
  const [skills, setSkills] = useState(config.skills.design.tools);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'siteContent', 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.aboutMe) setAboutMe(data.aboutMe);
          if (data.skills && Array.isArray(data.skills) && data.skills.length > 0) {
            setSkills(data.skills);
          }
        }
      } catch (error) {
        console.error("Error fetching dynamic content from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ aboutMe, skills, loading }}>
      {children}
    </ContentContext.Provider>
  );
};
