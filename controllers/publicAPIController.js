const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Fetch data from publicapis and send as response to user
exports.getAllData = catchAsync( async (req, res, next) => {

    const response = await fetch(process.env.PUBLIC_API);
    if (!response.ok) {
        return next (new AppError('something went wrong', 500));
    }
    const data = await response.json();
    const filteredData = new ApiFeatures(data.entries, req.query).filter().paginate();

    res.status(200).json({
        status: 'success',
        length: filteredData.data.length,
        data: {
            data: filteredData.data
        }
    });
});