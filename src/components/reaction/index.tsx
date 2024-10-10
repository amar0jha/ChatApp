import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import { colors } from '../../theme/colors';
import styles from './styles';
import { strings } from '../../theme/string';

interface SecureAccountModalProps {
    visible: boolean;
    closeModal: () => void;
    onClickEmoji: (emoji: string) => void;
    onClickDelete?: () => void; 
}

const EmojiModal = ({ visible, closeModal,onClickEmoji,onClickDelete }: SecureAccountModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={closeModal}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
                    <View style={styles.modalView}>
                    <View style={styles.emoji}>
                            <TouchableOpacity onPress={() => onClickEmoji('👍')}>
                                <Image source={Icons.thumbsUpEmoji} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClickEmoji('❤️')}>
                                <Image source={Icons.likeEmoji} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClickEmoji('😂')}>
                                <Image source={Icons.smileEmoji} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClickEmoji('🎉')}>
                                <Image source={Icons.partyEmoji} style={styles.emojiIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClickEmoji('👎')}>
                                <Image source={Icons.thumbsDownEmoji} style={styles.emojiIcon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.shareIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>{strings.reply}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.forwardIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>{strings.forward}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.copyIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>{strings.copy}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.starIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>{strings.star}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.reportIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText}>{strings.report}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onClickDelete}>
                            <View style={styles.optionContainer}>
                                <Image source={Icons.deleteIcon} style={styles.optionIcon} />
                                <Text style={styles.modalOptionText1}>{strings.delete}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};


export default EmojiModal;