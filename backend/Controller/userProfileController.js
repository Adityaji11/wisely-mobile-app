const Profile = require('../Model/userProfileModel');

/**
 * GET: Get User Profile
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.Users = async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await Profile.findOne({userId: userId});
    if (!profile) return res.status(404).json({error: 'Profile not found'});

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
/**
 * POST: Create or Update User Profile
 * @param {*} req
 * @param {*} res
 */
exports.userProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const { bio, age, gender, interestedIn } = req.body;
    let { socialLinks } = req.body;

    // Ensure `socialLinks` is properly formatted
    socialLinks = typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks;

    // Clean up keys
    const instagram = socialLinks?.instagram?.trim() || null;
    const facebook = socialLinks?.facebook?.trim() || null;

    // Extract the Cloudinary file URL
    const profileImage = req.file?.path; // Multer saves the Cloudinary URL here

    console.log('Body Data:', req.body);
    console.log('File Data:', req.file);

    // Update or create a profile in the database
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      {
        bio,
        age,
        gender,
        interestedIn: JSON.parse(interestedIn),
        socialLinks: { instagram, facebook },
        profileImage,
      },
      { new: true, upsert: true } // Create if it doesn't exist
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
