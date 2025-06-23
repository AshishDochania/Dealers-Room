import Deal from '../models/Deal.js';

export const uploadFileController = async (req, res) => {
  const { dealId } = req.params;

  try {
    const deal = await Deal.findById(dealId);
    if (!deal) return res.status(404).json({ msg: 'Deal not found' });

    // push file info into deal
    deal.files.push({
      url: req.file.path,
      filename: req.file.filename,
      uploadedBy: req.user._id,
    });

    await deal.save();
    res.status(200).json({ msg: 'File uploaded', file: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed' });
  }
};
