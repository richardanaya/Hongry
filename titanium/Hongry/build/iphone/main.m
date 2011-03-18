//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"production";
NSString * const TI_APPLICATION_ID = @"com.hongry.hongryapp";
NSString * const TI_APPLICATION_PUBLISHER = @"Richard";
NSString * const TI_APPLICATION_URL = @"http://www.hongry.com";
NSString * const TI_APPLICATION_NAME = @"Hongry";
NSString * const TI_APPLICATION_VERSION = @"1.1";
NSString * const TI_APPLICATION_DESCRIPTION = @"No description provided";
NSString * const TI_APPLICATION_COPYRIGHT = @"2011 by Richard";
NSString * const TI_APPLICATION_GUID = @"0f7068e9-6b5b-4353-8352-7d63cb4e0eef";
BOOL const TI_APPLICATION_ANALYTICS = true;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
