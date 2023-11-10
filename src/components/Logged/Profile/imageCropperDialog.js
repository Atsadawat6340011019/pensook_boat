import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { getCroppedImg, getRotatedImage } from './canvasUtils';

import { Box, Button, Dialog, DialogContent, DialogActions, Slider, Typography } from '@mui/material';

import CustomDivider from './customDivider';

function ImageCropperDialog(props) {
    const { imagePath, imageObject, aspectRatio, rotatable, shape, hideZoomScrollbar, open, onClose, callback } = props;

    const [image, setImage] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    useEffect(() => {
        let path = imagePath;
        if (imageObject) {
            path = URL.createObjectURL(imageObject);
        }
        setImage(path);
    }, [props]);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
            setCroppedImage(croppedImage);
            callback(croppedImage)
            handleClose()
        } catch (e) { }
    }, [image, croppedAreaPixels, rotation]);

    const handleClose = () => {
        onClose()
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setRotation(0)
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogContent sx={{ pb: 1 }} style={{ borderRadius: "8px"}}>
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 200, md: 400 }, borderRadius: "8px" }}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspectRatio}
                        cropShape={shape}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-evenly',
                        columnGap: 2,
                        mt: 1
                    }}
                >
                    {!hideZoomScrollbar && (
                        <Box sx={{ display: 'flex', flex: '1', alignItems: 'center' }}>
                            <Typography>ซูม</Typography>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                sx={{ padding: '22px 0px', marginLeft: 2 }}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </Box>
                    )}
                    {rotatable && (
                        <Box sx={{ display: 'flex', flex: '1', alignItems: 'center' }}>
                            <Typography>Rotation</Typography>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                sx={{ padding: '22px 0px', marginLeft: 2 }}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <CustomDivider />
            <DialogActions
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <Button variant="contained"
                    color="secondary"
                    sx={{
                        height: 50,
                        width: 250,
                        borderRadius: "8px",
                        fontSize: 16,
                    }}
                    style={{ color: "#ffff" }}
                    onClick={handleClose}>
                    ยกเลิก
                </Button>
                <Button vtype="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        height: 50,
                        width: 250,
                        borderRadius: "8px",
                        fontSize: 16,
                    }}
                    onClick={showCroppedImage}>
                    บันทึก
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ImageCropperDialog.propTypes = {
    imagePath: PropTypes.string,
    imageObject: PropTypes.object,
    aspectRatio: PropTypes.number,
    rotatable: PropTypes.bool,
    shape: PropTypes.oneOf(['rect', 'round']),
    hideZoomScrollbar: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    callback: PropTypes.func
}

ImageCropperDialog.defaultProps = {
    imagePath: '',
    aspectRatio: 1 / 1,
    rotatable: false,
    shape: 'rect',
    hideZoomScrollbar: false,
    callback: () => void (0),
};

export default ImageCropperDialog;