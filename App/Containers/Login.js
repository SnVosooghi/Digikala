import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
  Text,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import { createForm } from 'rc-form';
import { removeCookie } from '../lib/cookies'

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 50,
    justifyContent: 'center',
  },
  inputView: {
    width: width - 100,
    paddingLeft: 10,
  },
  input: {
    height: 42,
    fontSize: 16,
    borderWidth: .5,
    borderRadius: 15,
    marginTop: 10,
    padding: 12
  },
  errorinfo: {
    marginTop: 10,
  },
  errorinfoText: {
    color: 'red',
  },
});

class FromItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.array,
  };
  componentDidMount () {
    removeCookie('Auth:Token')
  }
  getError = error => {
    if (error) {
      return error.map(info => {
        return (
          <Text style={styles.errorinfoText} key={info}>
            {info}
          </Text>
        );
      });
    }
    return null;
  };
  render() {
    const { label, onChange, value, error } = this.props;
    return (
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={value || ''}
          label={`${label}：`}
          duration={150}
          onChangeText={onChange}
          highlightColor="#40a9ff"
        />
        <View style={styles.errorinfo}>{this.getError(error)}</View>
      </View>
    );
  }
}

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  checkUserNameOne = (value, callback) => {
    
    setTimeout(() => {
      if (value === '15188888888') {
        callback('手机号已经被注册');
      } else {
        callback();
      }
    }, 500);
  };
  submit = () => {
    this.props.form.validateFields((error, value) => {

      if (error) return; // eslint-disable-line new-cap
      this.props.login(value).then(result => {
        Alert.alert(result.message)
        if(result.message== 'logged in')
          this.props.navigation.navigate('Home')
      })
    });
  };
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <View style={styles.container}>
        <Text>username</Text>
        {getFieldDecorator('username', {
          validateFirst: true,
          rules: [
            { required: true, message: 'required!' },
            {
              pattern: /^.{3,}$/,
              message: 'enter atleast 3 character!',
            },
            {
              validator: (rule, value, callback) => {
                this.checkUserNameOne(value, callback);
              },
              message: 'checkedUsername!',
            },
          ],
        })(
          <FromItem
            autoFocus
            placeholder="username"
            error={getFieldError('username')}
          />
        )}

        <Text>password</Text>
        {getFieldDecorator('password', {
          validateFirst: true,
          rules: [
            { required: true, message: 'required!' },
            {
              pattern: /^.{3,}$/,
              message: 'enter atleast 3 character!',
            },
            {
              validator: (rule, value, callback) => {
                this.checkUserNameOne(value, callback);
              },
              message: 'checkedPassword!',
            },
          ],
        })(
          <FromItem
            autoFocus
            placeholder="password"
            error={getFieldError('password')}
          />
        )}
        
        <Button color="#40a9ff" onPress={this.submit} title="submit" />
      </View>
    );
  }
}

const SignInPage = createForm()(Login);




const mapDispatchToProps = (dispatch) => ({
  login: (credintials) => dispatch.auth.login( credintials),

});

export default connect(null, mapDispatchToProps)(SignInPage);